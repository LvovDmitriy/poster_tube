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

    handleClick = async (vid_id) => {
        await this.changeVidApi(vid_id)
            .catch(err => console.log(err));
        var resGetVid = await this.initApiCall()
            .catch(err => console.log(err));
        await this.setState({ currVid: resGetVid.shift()});
        var images = [];
        for(let i = 0; i < 5; i++) {
            images[i] = resGetVid.shift();
            images[i].image = require('../../Image/' + images[i].img_path);
        }
        await this.setState({ images });
        await this.setState(prevState => ({
            currVid: {
                ...prevState.currVid,
                video: require('../../Video/' + this.state.currVid.video_path)}}));
        }

    componentDidMount = async () => {
        var resGetVid = await this.initApiCall()
            .catch(err => console.log(err));
        await this.setState({ currVid: resGetVid.shift()});
        var images = [];
        for(let i = 0; i < 5; i++) {
            images[i] = resGetVid.shift();
            images[i].image = require('../../Image/' + images[i].img_path);
        }
        await this.setState({ images });
        await this.setState(prevState => ({
            currVid: {
                ...prevState.currVid,
                video: require('../../Video/' + this.state.currVid.video_path)}}));
    }

    initApiCall = async () => {
        const response = await fetch('/get_all_videos');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    changeVidApi = async (video_id) => {
        const response = await fetch('/set_all_videos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({videooo: video_id})
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col xs={8} sm={8} md={8} lg={8} className="videoPart">
                        <Player src={this.state.currVid.video}/>
                        <h2>{this.state.currVid.name}</h2>
                        <button><a href={this.state.currVid.video} download>Download</a></button>
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={4} className = "sidebar">
                        {this.state.images.map(e => (
                            <div className="sidevideo">
                            <img src={e.image} onClick={this.handleClick.bind(this, e.id)}></img>
                            <h2>{e.name}</h2>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default VideoCore;
