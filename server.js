const express = require('express');
const mysql = require('promise-mysql');
const bodyParser = require('body-parser');
const shuffleArray = require('shuffle-array');

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

let videosToClient = [];

// Set main video by id and search for proposed videos
getMainAndProposedVideos = (newMainVideoId) => {
    let numOfProposed = 1;
    videosToClient = [];

    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'poster'
    })
    
    .then((connection) => {
        connection.query('SELECT * FROM video', (err, videosFromDB) => {
            if(err) {
                throw err;
            } else {
                // Setting new main video
                videosToClient.push( videosFromDB[newMainVideoId - 1] );

                // Shuffling array of videos for not choosing same videos each time
                shuffleArray(videosFromDB);

                // Getting 2 or less videos with same category 
                let videosWithSameCategory = chooseVideosFromSameCategory(videosToClient[0], videosFromDB);
                videosWithSameCategory.forEach(video => {
                    videosToClient.push(video);
                });

                // Getting 3 or more videos from other categories so that we have 6 videos to send at all
                let videosWithDifferentCategory = chooseVideosFromDifferentCategory(videosToClient[0], 
                    videosFromDB, videosToClient.length);
                    videosWithDifferentCategory.forEach(video => {
                    videosToClient.push(video);
                });
            }
        });

        connection.end();
    });
};

chooseVideosFromSameCategory = (newMainVideo, videosFromDB) => {
    let videosWithSameCategory = videosFromDB.filter((video) => {
        return (video.category === newMainVideo.category && video.id !== newMainVideo.id);
    });
    return videosWithSameCategory.slice(0, 2);
};

chooseVideosFromDifferentCategory = (newMainVideo, videosFromDB, numberOfChosenVideos) => {
    let numberOfVideosToAdd = 6 - numberOfChosenVideos;

    let videosWithDifferentCategory = videosFromDB.filter((video) => {
        return (video.category !== newMainVideo.category);
    });
    return videosWithDifferentCategory.slice(0, numberOfVideosToAdd);
};

// Request for main and proposed videos
app.get('/get_all_videos', (request, result) => {
    result.send(videosToClient);
});

// Request for changing main and proposed videos
app.post('/set_all_videos', async (request, result) => {
    await getMainAndProposedVideos(request.body.newMainVideoId); 
    result.send(request.body);    
});

app.listen(port, () => console.log(`Listening on port ${port}`));