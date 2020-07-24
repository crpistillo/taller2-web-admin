import React, {Component} from "react";
import AdminHeader from "../../common/AdminHeader";
import WaitingSpinner from "../../common/WaitingSpinner";
import {VIDEOS_ENDPOINT} from "../../vars/endpoints";
import {store} from "../../index";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';


export default class VideoResources extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isLoadingVideos: true,
            videos: undefined,
            currentPage: 1
        }

        this.videosPerPage = 10;
        this.title = "Video resources"
        this.headerText = "Administration of videos uploaded by app users."
        this.descriptionText = "In this page, you can see all the information of the videos that were uploaded by different" +
            " registered users. Additionally, you can delete them if you consider that it is necessary. Be careful!"
    }

    fetchVideos(){
        let requestHeaders = {
            Authorization: `Bearer ${store.getState().appReducer.token}`,
            Accept: "application/json",
        };

        const endpoint = VIDEOS_ENDPOINT + `?page=${this.state.currentPage-1}&per_page=${this.videosPerPage}`

        let request = new Request(endpoint, {
            method: "GET",
            headers: requestHeaders,
        });

        fetch(request)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                this.setState({videos: json.results, isLoadingVideos: false})
            })
    }

    componentDidMount() {
        this.fetchVideos()
    }

    videosComponent(){
        return (
            <Grid container spacing={3}>
                {this.state.videos.map((video, index) => (
                    <Grid item xs={12} key={index}>
                        <Paper elevation={10} >
                                <Grid container item xs={3} direction="row" justify="flex-start" style={{margin: 20}}>
                                    <Typography variant="subtitle1">
                                        {"Title: " + video.video.title}
                                    </Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        )
    }

    render(){
        const componentToShow = this.state.isLoadingVideos ?
            <WaitingSpinner activated={true} variant="secondary"/> :
            this.videosComponent();
        return (
            <div style={{paddingTop: 100}}>
                <Grid container >
                    <AdminHeader title={this.title} headerText={this.headerText}  descriptionText={this.descriptionText}/>
                    <Grid item xs={12}>
                    {componentToShow}
                    </Grid>
                </Grid>
            </div>

        )
    }
}