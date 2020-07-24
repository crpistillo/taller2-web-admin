import React, { Component } from "react";
import AdminHeader from "../../common/AdminHeader";
import Container from "react-bootstrap/Container";
import WaitingSpinner from "../../common/WaitingSpinner";
import {VIDEOS_ENDPOINT} from "../../vars/endpoints";

export default class VideoResources extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isLoadingVideos: true,
            videosToShow: undefined,
            currentPage: 0
        }

        this.videosPerPage = 10;
        this.title = "Video resources"
        this.headerText = "Administration of videos uploaded by app users."
        this.descriptionText = "In this page, you can see all the information of the videos that were uploaded by different" +
            " registered users. Additionally, you can delete them if you consider that it is necessary. Be careful!"
    }

    fetchVideos(){
        const queryUrl = VIDEOS_ENDPOINT + `?page=${this.state.currentPage}`
    }

    componentDidMount() {

    }

    render(){
        const componentToShow = this.state.isLoadingVideos ? <WaitingSpinner activated={true} variant="secondary"/> : <p>Fracasado</p>;
        console.log(componentToShow)
        return (
            <div style={{paddingTop: 100}}>
                <Container fluid >
                    <AdminHeader title={this.title} headerText={this.headerText}  descriptionText={this.descriptionText}/>
                    {componentToShow}
                </Container>
            </div>

        )
    }
}