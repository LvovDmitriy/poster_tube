import React, { Component } from 'react';
import "../../../node_modules/video-react/dist/video-react.css";
import '../../App.css';
import './VideoCore.css';
import {Player} from 'video-react';
import { Container, Row, Col } from 'reactstrap';

class VideoCore extends Component {
    constructor () {
        super();
        this.state = {
            images: [],
            currVid: {}
         };
    }

    // Handler of click on posters of proposed videos
    clickOnImage = async (vid_id) => {
        await this.changeVidApi(vid_id)
            .catch(err => console.log(err));
        window.scrollTo(0, 0);
        await this.getVidApi()
            .catch(err => console.log(err));
    }

    componentDidMount = async () => {
        await this.getVidApi()
            .catch(err => console.log(err));
    }

    // Request for getting current and proposed videos from API
    getVidApi = async () => {
        const response = await fetch('/get_all_videos');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        await this.setState({ currVid: body.shift()});
        var images = [];
        for(let i = 0; i < 5; i++) {
            images[i] = body.shift();
            images[i].image = require('../../Image/' + images[i].img_path);
        }
        await this.setState({ images });
        await this.setState(prevState => ({
            currVid: {
                ...prevState.currVid,
                video: require('../../Video/' + this.state.currVid.video_path)}}));
        return body;
    };

    // Request for setting current and proposed videos on API
    changeVidApi = async (video_id) => {
        const response = await fetch('/set_all_videos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({vid_id: video_id})
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col xs={12} sm={12} md={8} lg={8} className="videoPart">
                        <Player src={this.state.currVid.video}/>
                        <h2>{this.state.currVid.name}</h2>
                        <button className="downloadBtn"><a href={this.state.currVid.video} download><b>Download</b></a></button>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} className = "sidebar">
                        {this.state.images.map(e => (
                            <div className="sideVideo">
                                <div className="sideImage">
                                    <img src={e.image} onClick={this.clickOnImage.bind(this, e.id)}></img>
                                    <p className="sideDuration">{e.duration}</p>
                                </div>
                                <div className="sideDescr">
                                    <h2>{e.name}</h2>
                                </div>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default VideoCore;
