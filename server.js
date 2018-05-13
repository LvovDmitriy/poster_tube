const express = require('express');
const app = express();
const mysql = require('promise-mysql');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// Init properties for our responses
var firstVideo = '2';
var allVideos = [];
getVideoById(firstVideo);

// Set current video by id and search for proposed videos
async function getVideoById(vid_id) {
    var numOfProposed = 0;
    allVideos = [];
    var connection;
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'poster'
    }).then(function(conn){
        connection = conn;
        var sqlMainVid = 'SELECT * FROM video';
        var result = connection.query(sqlMainVid, (err, result) => {
            if(err) {
                throw err;
            } else {
                allVideos[numOfProposed++] = result[vid_id - 1];
                shuffleArray(result);
                for(let i = 0; i < result.length; i++) {
                    if((allVideos[0].category == result[i].category) && (result[i].id != vid_id))  {
                        allVideos[numOfProposed++] = result[i];
                    }
                    if(numOfProposed >= 3) break;
                }
                for(let i = 0; i < result.length; i++) {
                    if((allVideos[0].category != result[i].category))  {
                        allVideos[numOfProposed++] = result[i];
                    }
                    if(numOfProposed >= 6) break;
                }
            }
        });
        connection.end();
    });


}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Request for current and proposed videos
app.get('/get_all_videos', (req, res) => {
    res.send(allVideos);
});

// Request for changing current and proposed videos
app.post('/set_all_videos', async function (req, res) {
    await getVideoById(req.body.vid_id); 
    res.send(req.body);    
});

app.listen(port, () => console.log(`Listening on port ${port}`));