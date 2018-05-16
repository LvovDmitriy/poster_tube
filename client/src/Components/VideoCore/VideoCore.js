import React, {Component} from 'react';
import './VideoCore.css';
import {Player} from 'video-react';
import {Col, Container, Row} from 'reactstrap';


class VideoCore extends Component {
    constructor() {
        super();
        this.state = {
            initialVideoId: '2',
            proposedVideos: [],
            currentVideo: {}
        };
    };

    componentDidMount = () => {
        this.getInitialVideo();
    };

    getInitialVideo = async () => {
        await this.changeMainVideoAtApi(this.state.initialVideoId);

        await this.getVideosFromApi();
    };

    clickOnProposedVideo = async (newVideoId) => {
        await this.changeMainVideoAtApi(newVideoId);

        window.scrollTo(0, 0);

        await this.getVideosFromApi();
    };

    getVideosFromApi = async () => {
        const response = await fetch('/get_all_videos');
        const videosFromApi = await response.json();
        if (response.status !== 200) throw Error(videosFromApi.message);
        await this.setVideosAsState(videosFromApi);
    };

    changeMainVideoAtApi = async (newVideoId) => {
        const response = await fetch('/set_all_videos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newMainVideoId: newVideoId})
        });

        await response;
    };

    setVideosAsState = async (videosFromApi) => {
        let newMainVideo = videosFromApi.shift();
        newMainVideo.video = require('../../Video/' + newMainVideo.videoPath);
        await this.setState({currentVideo: newMainVideo});

        videosFromApi.forEach(video => {
            video.image = require('../../Image/' + video.imagePath);
        });
        await this.setState({proposedVideos: videosFromApi});
    };

    renderProposedPosters = (posters) => {
        return posters.map(poster => (
            <div className="sideVideo">
                <div className="sideImage">
                    <img src={poster.image} onClick={this.clickOnProposedVideo.bind(this, poster.id)}></img>
                    <p className="sideDuration">{poster.duration}</p>
                </div>
                <div className="sideDescr">
                    <h2>{poster.name}</h2>
                </div>
            </div>
        ))
    };

    render() {
        const proposedPosters = this.renderProposedPosters(this.state.proposedVideos);

        return (
            <Container fluid>
                <Row>
                    <Col xs={12} sm={12} md={8} lg={8} className="videoPart">
                        <Player src={this.state.currentVideo.video}/>
                        <h2>{this.state.currentVideo.name}</h2>
                        <button className="downloadBtn"><a href={this.state.currentVideo.video} download><b>Download</b></a>
                        </button>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} className="sidePosters">
                        {proposedPosters}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default VideoCore;
