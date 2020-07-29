import React, {Component} from "react";
import AdminHeader from "../../common/AdminHeader";
import WaitingSpinner from "../../common/WaitingSpinner";
import {DELETE_VIDEO_ENDPOINT, VIDEOS_ENDPOINT} from "../../vars/endpoints";
import {store} from "../../index";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CustomTypography from "../../common/CustomTypography";
import Avatar from '@material-ui/core/Avatar';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@material-ui/lab/Pagination';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {Redirect} from "react-router-dom";


export default class VideoResources extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isLoadingVideos: true,
            videos: undefined,
            currentPage: 1,
            totalPages: 0,
            openModal: false,
            videoToDelete: "",
            userEmailOfVideoToDelete: "",
            showSuccessfulAlert: false,
            showErrorAlert: false
        }

        this.videosPerPage = 10;
        this.title = "Video resources"
        this.headerText = "Administration of videos uploaded by app users."
        this.descriptionText = "In this page, you can see all the information of the videos that were uploaded by different" +
            " registered users. Additionally, you can delete them if you consider that it is necessary. Be careful!"
    }

    fetchVideos(page){
        let requestHeaders = {
            Authorization: `Bearer ${store.getState().appReducer.token}`,
            Accept: "application/json",
        };

        const endpoint = VIDEOS_ENDPOINT + `?page=${page-1}&per_page=${this.videosPerPage}`

        let request = new Request(endpoint, {
            method: "GET",
            headers: requestHeaders,
        });

        fetch(request)
            .then(response => response.json())
            .then(json => {
                this.setState({videos: json.results, isLoadingVideos: false, totalPages: json.pages})
            })
    }

    componentDidMount() {
        this.fetchVideos(this.state.currentPage)
    }

    gridTitleContainer(overlineText="", captionText=""){
        return(
            <Grid container item alignItems="flex-start" xs={12} >
                <CustomTypography overlineText={overlineText} captionText={captionText}/>
            </Grid>
        )
    }

    gridTitleWithAvatar(overlineText, captionText, avatarSrc){
        return(
            <Grid container direction="row" justify="space-between" alignItems="center" style={{paddingLeft: 8}}>
                <Grid item>
                    <CustomTypography overlineText={overlineText} captionText={captionText}/>
                </Grid>
                <Grid item>
                    <Avatar src={`data:image/png;base64, ${avatarSrc}`} />
                </Grid>
            </Grid>
        )
    }

    changePage(page){
        window.scroll(0,0)
        this.setState({isLoadingVideos: true, currentPage: page})
        this.fetchVideos(page)
    }

    deleteVideo(){
        this.setState({isLoadingVideos: true, openModal: false})
        let requestHeaders = {
            Authorization: `Bearer ${store.getState().appReducer.token}`,
            Accept: "application/json",
        };

        const endpoint = DELETE_VIDEO_ENDPOINT + `?email=${this.state.userEmailOfVideoToDelete}&video_title=${this.state.videoToDelete.title}`



        let request = new Request(endpoint, {
            method: "DELETE",
            headers: requestHeaders,
        });

        fetch(request)
            .then(response => {
                if(response.ok){
                    this.setState({showSuccessfulAlert: true})
                    this.changePage(this.state.videos.length === 1 ?
                                    this.state.currentPage - 1 : this.state.currentPage)
                } else {
                    this.setState({showErrorAlert: true, isLoadingVideos: false})
                }
            })
    }

    deleteModal(){
        const body = (
            <div className="delete-modal delete-modal-container">
                <Grid container direction="row">
                    <Grid item xs={12} >
                        <Paper style={{padding: 20, borderRadius: 20}}>
                            <Grid container spacing={2}>
                                <Grid container item xs={12} direction="row" justify="center">
                                    <CustomTypography
                                        captionText="Are you sure you want to delete"
                                    />
                                </Grid>
                                <Grid container item xs={12} direction="row" justify="center" alignContent="center">
                                <CustomTypography
                                    overlineText={`${this.state.videoToDelete.title} ?`}
                                />
                                </Grid>
                                <Grid container item xs={12} direction="row" justify="space-around">
                                    <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{margin: 1}}
                                        startIcon={<CancelIcon/>}
                                        onClick={() => this.setState({openModal: false})}>
                                        CANCEL
                                    </Button>
                                    </Grid>
                                    <Grid>
                                        <Button
                                            variant="contained"
                                            color="default"
                                            style={{margin: 1}}
                                            startIcon={<DeleteIcon/>}
                                            onClick={() => this.deleteVideo()}>
                                        DELETE
                                        </Button>
                                    </Grid>

                                </Grid>
                            </Grid>

                        </Paper>
                </Grid>
            </Grid>

            </div>
        );
        return(
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={this.state.openModal}
                    onClose={() => this.setState({openModal: false})}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 100,
                    }}
                >
                    <Fade in={this.state.openModal}>
                        {body}
                    </Fade>
                </Modal>
            </div>
        )
    }

    videosComponent(){
        return (
            <div>
                <Grid container spacing={1}>
                    {this.state.videos.map((video, index) => (
                        <Grid container>
                            <Grid item xs={12} key={index}>
                                    <Paper elevation={10} >
                                    <Grid container style={{margin: 20}} spacing={2} direction="row">
                                        <Grid item xs={3} style={{marginLeft: 5}}>
                                            <Grid container spacing={2}>
                                                {this.gridTitleContainer("Title: ", video.video.title)}
                                                {this.gridTitleWithAvatar("Owner: ", video.user.fullname, video.user.photo)}
                                                {this.gridTitleContainer("Email: ", video.user.email)}
                                                {this.gridTitleContainer("Uploaded: ", video.video.creation_time.slice(0, 10))}
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <hr className="vertical-hr" />
                                        </Grid>
                                        <Grid item container direction="column" justify="space-around" xs={1}>
                                            <Grid container item direction="row" justify="space-around" alignItems="center">
                                                <Grid item>
                                                    <ThumbUpIcon />
                                                </Grid>
                                                <Grid item>
                                                    <CustomTypography variant="subtitle2" overlineText={video.reactions.like.toString()} />
                                                </Grid>
                                            </Grid>
                                            <Grid container item direction="row" justify="space-around" alignItems="center" >
                                                <Grid item>
                                                    <ThumbDownIcon />
                                                </Grid>
                                                <Grid item>
                                                    <CustomTypography variant="subtitle2" overlineText={video.reactions.dislike.toString()} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <hr className="vertical-hr" />
                                        </Grid>
                                        <Grid item xs={3} container justify="center" alignItems="center">
                                            <video controls style={{width: 220, height: 160}}>
                                                <source src={video.video.file_location}/>
                                            </video>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <hr className="vertical-hr" />
                                        </Grid>
                                        <Grid item container xs={1} justify="center" alignItems="center">
                                            <Grid item xs={3}
                                                  onClick={() => this.setState({openModal: true, videoToDelete: video.video, userEmailOfVideoToDelete: video.user.email})}>
                                                <IconButton aria-label="delete" size="medium">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>

                    ))}
                </Grid>
                <Grid container justify="center">
                    <Pagination
                        count={this.state.totalPages}
                        defaultPage={this.state.currentPage}
                        variant="outlined" color="primary"
                        onChange={(e, v) => this.changePage(v)}
                    />
                </Grid>
            </div>


        )
    }

    errorSnackBar(){
        return(
            <Snackbar open={this.state.showErrorAlert} autoHideDuration={6000}
                      anchorOrigin={{vertical: "top", horizontal: "right"}}
                      onClose={() => this.setState({showErrorAlert: false})}>
                <MuiAlert elevation={6} variant="filled" onClose={() => this.setState({showErrorAlert: false})} severity="warning">
                    Error deleting video.
                </MuiAlert>
            </Snackbar>
        )
    }

    successSnackBar(){
        return(
            <Snackbar open={this.state.showSuccessfulAlert} autoHideDuration={6000}
                      anchorOrigin={{vertical: "top", horizontal: "right"}}
                      onClose={() => this.setState({showSuccessfulAlert: false})}>
                <MuiAlert elevation={6} variant="filled" onClose={() => this.setState({showSuccessfulAlert: false})} severity="success">
                    Video deleted successfully!
                </MuiAlert>
            </Snackbar>
        )
    }

    render(){
            if (!store.getState().appReducer.loggedIn) return <Redirect to="/sign-in" />
        const componentToShow = this.state.isLoadingVideos ?
            <WaitingSpinner activated={true} variant="secondary"/> :
            this.videosComponent();
        return (
            <div style={{padding: 100, paddingTop: 100}}>
                <Grid container justify="center">
                    <AdminHeader title={this.title} headerText={this.headerText}  descriptionText={this.descriptionText}/>
                    {componentToShow}
                    {this.deleteModal()}
                    {this.successSnackBar()}
                    {this.errorSnackBar()}
                </Grid>
            </div>

        )
    }
}