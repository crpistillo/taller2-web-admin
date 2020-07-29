import React, {Component} from "react";
import WaitingSpinner from "../../common/WaitingSpinner";
import AdminHeader from "../../common/AdminHeader";
import {store} from "../../index";
import {APP_SERVERS_ENDPOINT} from "../../vars/endpoints";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import {Redirect} from "react-router-dom";

export default class AppServers extends Component {
    title = "App Servers"
    headerText = "Visualisation of active app servers."
    descriptionText = "In this page, you can see a list of the active app servers. Also, some characteristics of them, such " +
        "as the number of api calls, mean response time and error count, all in the seven last days, are displayed."

    state = {
        isLoadingServers: true,
        servers: undefined
    }

    fetchAppServers(){
        let requestHeaders = {
            Authorization: `Bearer ${store.getState().appReducer.token}`,
            Accept: "application/json",
        };

        let request = new Request(APP_SERVERS_ENDPOINT, {
            method: "GET",
            headers: requestHeaders,
        });

        fetch(request)
            .then(response => response.json())
            .then(servers => {
                console.log(servers)
                this.setState({servers: servers, isLoadingServers: false})
            } )

    }

    componentDidMount() {
        this.fetchAppServers()
    }

    titleContainer(title="", captionText=""){
        return(
            <Grid container item alignItems="flex-start" xs={12} >
                <div>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="subtitle1">{captionText}</Typography>
                </div>
            </Grid>
        )
    }

    healthyComponent(isHealthy){
        if(isHealthy){
            return (
                <Grid item container direction="row" justify="flex-start" style={{paddingLeft: 5, paddingTop: 10}}>
                    <Alert variant="filled" severity="success" style={{fontSize: 10}}>SERVER UP</Alert>
                </Grid>
            )
        } else {
            return (
                <Grid item container direction="row" justify="flex-start" style={{paddingLeft: 5, paddingTop: 10}}>
                    <Alert variant="filled" severity="error" style={{fontSize: 10}}>SERVER DOWN</Alert>
                </Grid>
            )
        }
    }

    serversComponent(){
        return (
            <div>
                <Typography variant="h3" style={{paddingBottom: 30}}>ChoTuve App servers</Typography>
                <Grid container spacing={3}>

                {this.state.servers.map((server, index) => {
                    return (
                            <Grid item xs={12} key={index}>
                                <Paper elevation={12}>
                                    <Grid container direction="row" style={{padding: 20}}>
                                        <Grid xs={2} item>
                                            {this.titleContainer("Server alias: ", server.server_alias)}
                                            {this.healthyComponent(server.is_healthy)}
                                        </Grid>
                                        <Grid item xs={2} style={{paddingRight: 30}}>
                                            {this.titleContainer("","Last seven days statistics: ")}
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Grid container direction="column" alignItems="flex-start">
                                                <Grid item>
                                                    <Typography variant="subtitle2">
                                                        {`Api calls: ${server.metrics.api_calls_last_7_days}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item style={{paddingTop: 20}}>
                                                    <Typography variant="subtitle2">
                                                        {`Mean response time: ${server.metrics.mean_response_time_last_7_days}`}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container direction="column" alignItems="flex-start">
                                                <Grid item>
                                                    <Typography variant="subtitle2">
                                                        {`Bad requests error rate: ${server.metrics.status_400_rate_last_7_days}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item style={{paddingTop: 20}}>
                                                    <Typography variant="subtitle2">
                                                        {`Internal server error rate: ${server.metrics.status_500_rate_last_7_days}`}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Paper>
                            </Grid>

                    )
                })}
                </Grid>
            </div>


        )
    }


    render() {
        if (!store.getState().appReducer.loggedIn) return <Redirect to="/sign-in" />
        const componentToShow = this.state.isLoadingServers ?
            <WaitingSpinner activated={true} variant="secondary"/> :
            this.serversComponent();
        return (
            <div style={{padding: 100}}>
                <AdminHeader title={this.title} headerText={this.headerText}  descriptionText={this.descriptionText}/>

                {componentToShow}
            </div>
        );
    }
}

/*metrics:
api_calls_last_7_days: 8
mean_response_time_last_7_days: 0.000003472101525403559
status_400_rate_last_7_days: 0
status_500_rate_last_7_days: 0*/