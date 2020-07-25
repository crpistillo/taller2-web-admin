import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Chart from './Chart';
import CumulativeComponent from './CumulativeComponent';
import {GET_STATS_ENDPOINT} from "../../vars/endpoints";
import Moment from "moment";
import Sankey from "./Sankey";
import PieComponent from "./PieComponent";
import BarComponent from "./BarComponent";
import Histogram from "./Histogram";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://web-admin-chotuve.herokuapp.com/">
                Choutuve Web Admin
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function sum(json_data) {
    var cnt = 0;
    for (var type in json_data) {
        cnt += json_data[type];
    }
    return cnt;
}


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    formControl: {
        margin: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
    }
}));

export default function StatsDashboardContainer() {
    const classes = useStyles();
    const [stats, setStats] = useState({});
    const [isFetching, setIsFetching] = useState(true);

    const [valueDays, setValueDays] = React.useState('7');
    const [chosenDay, setChosenDay] = React.useState('7');
    const [statsType, setStatsType] = React.useState('user');
    const [chosenType, setChosenType] = React.useState('user');

    const handleRadioChangeDay = (event) => {
        setChosenDay(event.target.value);
    };
    const handleRadioChangeType = (event) => {
        setChosenType(event.target.value);
    };

    // API FUNCTIONS
    const generateRequest = (days) => {
        let requestHeaders = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };

        return new Request(GET_STATS_ENDPOINT + `?days=${days}`, {
            method: "GET",
            headers: requestHeaders,
        });
    }
    const handleSubmit = async () => {
        setIsFetching(true);
        setValueDays(chosenDay);
        setStatsType(chosenType);
        let request = generateRequest(chosenDay);
        const response = await fetch(request);
        const data = await response.json();
        setStats(data);
        setIsFetching(false);
    }

    useEffect(() => {
        handleSubmit(Number(valueDays));
    }, []);

    //Types of stats to show
    const userComponent = () => {
        return (
            <Grid container spacing={3} direction={"row"} justify={"center"}>
                {/* Chart uploaded videos*/}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                        <Chart
                            data={stats["last_days_uploaded_videos"]}
                            title={"Uploaded videos in the last " + valueDays + " days"}
                            ylabel={"Videos"}
                        />
                    </Paper>
                </Grid>
                {/* cumulative info */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <CumulativeComponent
                            cumulative={sum(stats["last_days_uploaded_videos"]) + " videos"}
                            title={"Videos in the last " + valueDays + " days"}
                            text={"Since " + Moment().subtract(valueDays, 'days').format('LL')}
                        />
                    </Paper>
                </Grid>
                {/* Chart registered users*/}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                        <Chart
                            data={stats["last_days_user_registrations"]}
                            title={"Registered users in the last " + valueDays + " days"}
                            ylabel={"Users"}
                        />
                    </Paper>
                </Grid>
                {/* cumulative info */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <CumulativeComponent
                            cumulative={sum(stats["last_days_user_registrations"]) + " users"}
                            title={"Registrations in the last " + valueDays + " days"}
                            text={"Since " + Moment().subtract(valueDays, 'days').format('LL')}
                        />
                    </Paper>
                </Grid>
                {/* Chart users logins*/}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                        <Chart
                            data={stats["last_days_users_logins"]}
                            title={"Logged users in the last " + valueDays + " days"}
                            ylabel={"Users"}
                        />
                    </Paper>
                </Grid>
                {/* cumulative info */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <CumulativeComponent
                            cumulative={sum(stats["last_days_users_logins"]) + " users"}
                            title={"Logins in the last " + valueDays + " days"}
                            text={"Since " + Moment().subtract(valueDays, 'days').format('LL')}
                        />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
    const apiComponent = () => {
        return (
            <Grid container spacing={3} direction={"row"} justify={"center"}>
                {/* Chart api call amount*/}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                        <Chart
                            data={stats["last_days_api_call_amount"]}
                            title={"API calls in the last " + valueDays + " days"}
                            ylabel={"API calls"}
                        />
                    </Paper>
                </Grid>
                {/* cumulative info */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <CumulativeComponent
                            cumulative={sum(stats["last_days_api_call_amount"]) + " API calls"}
                            title={"API calls in the last " + valueDays + " days"}
                            text={"Since " + Moment().subtract(valueDays, 'days').format('LL')}
                        />
                    </Paper>
                </Grid>
                {/* Chart api call mean*/}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                        <Chart
                            data={stats["last_day_mean_api_call_time"]}
                            title={"API calls in average response time in the last " + valueDays + " days"}
                            ylabel={"Time of response"}
                            truncate={"4"}
                        />
                    </Paper>
                </Grid>
                {/* cumulative info */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <CumulativeComponent
                            cumulative={sum(stats["last_days_api_call_amount"]) + " API calls"}
                            title={"API calls in the last " + valueDays + " days"}
                            text={"Since " + Moment().subtract(valueDays, 'days').format('LL')}
                        />
                    </Paper>
                </Grid>
                {/* Sankey chart api call amount*/}
                <Grid item xs={12}>
                    <Paper style={{height: 600}} className={fixedHeightPaper}>
                        <Sankey
                            data={stats["last_days_api_calls_by_path"]}
                            title={"API calls in the last " + valueDays + " days"}
                            ylabel={"API calls"}
                        />
                    </Paper>
                </Grid>
                {/* Pie chart api call amount*/}
                <Grid item xs={12}>
                    <Paper style={{height: 600}} className={fixedHeightPaper}>
                        <PieComponent
                            data={stats["last_days_api_calls_by_path"]}
                            title={"API calls in the last " + valueDays + " days"}
                            ylabel={"API calls"}
                        />
                    </Paper>
                </Grid>
                {/* Bar chart api call amount by method*/}
                <Grid item xs={12}>
                    <Paper style={{height: 600}} className={fixedHeightPaper}>
                        <Histogram
                            data={stats["last_days_api_calls_response_times_sample"]}
                            title={"Histogram of API call response time in the last " + valueDays + " days."}
                            subtitle={"Response times over 0.2 seconds where filtered due to low amount of samples."}
                            ylabel={"API calls"}
                        />
                    </Paper>
                </Grid>
                {/* Bar chart api call amount*/}
                <Grid item xs={12}>
                    <Paper style={{height: 600}} className={fixedHeightPaper}>
                        <BarComponent
                            data={stats["last_days_api_calls_by_path"]}
                            title={"API calls in the last " + valueDays + " days"}
                            ylabel={"API calls"}
                        />
                    </Paper>
                </Grid>
                {/* Bar chart api call amount by method*/}
                <Grid item xs={12}>
                    <Paper style={{height: 600}} className={fixedHeightPaper}>
                        <BarComponent
                            data={stats["last_days_api_calls_by_method"]}
                            title={"API calls by method in the last " + valueDays + " days"}
                            ylabel={"API calls"}
                        />
                    </Paper>
                </Grid>
                {/* Bar chart api call amount by status*/}
                <Grid item xs={12}>
                    <Paper style={{height: 600}} className={fixedHeightPaper}>
                        <BarComponent
                            data={stats["last_days_api_calls_by_status"]}
                            title={"API calls by status in the last " + valueDays + " days"}
                            ylabel={"API calls"}
                        />
                    </Paper>
                </Grid>

            </Grid>
        );
    }

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    let typeToShow = statsType === 'user' ? userComponent() : apiComponent();

    return (
        (isFetching)
            ?
            <div/>
            :

            <div className={classes.root}>

                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>

                    <Container maxWidth="lg" className={classes.container}>
                        {/*Form*/}
                        <Grid container spacing={3} direction={"row"} justify={"center"}>
                            <form onSubmit={handleSubmit}>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">Choose statistics you wish to
                                        visualise...</FormLabel>
                                    <RadioGroup aria-label="quiz" name="quiz" value={chosenType}
                                                style={{flexDirection: 'row'}} onChange={handleRadioChangeType}>
                                        <FormControlLabel value="user" control={<Radio/>} label="Users Statistics"/>
                                        <FormControlLabel value="api" control={<Radio/>} label="API Statistics"/>
                                    </RadioGroup>
                                </FormControl>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">Choose amount of last days to
                                        visualise...</FormLabel>
                                    <RadioGroup aria-label="quiz" name="quiz" value={chosenDay}
                                                style={{flexDirection: 'row'}} onChange={handleRadioChangeDay}>
                                        <FormControlLabel value="1" control={<Radio/>} label="Last day"/>
                                        <FormControlLabel value="3" control={<Radio/>} label="Last 3 days"/>
                                        <FormControlLabel value="7" control={<Radio/>} label="Last 7 days"/>
                                        <FormControlLabel value="15" control={<Radio/>} label="Last 15 days"/>
                                        <FormControlLabel value="30" control={<Radio/>} label="Last 30 days"/>
                                    </RadioGroup>
                                </FormControl>
                                <Button style={{marginTop: 30}} type="submit" variant="outlined" color="primary"
                                        className={classes.button}>
                                    Stats!
                                </Button>
                            </form>
                        </Grid>
                        {typeToShow}
                        <Box pt={4}>
                            <Copyright/>
                        </Box>
                    </Container>
                </main>
            </div>
    );
}