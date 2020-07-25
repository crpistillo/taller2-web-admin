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
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Sankey from "./Sankey";
import PieComponent from "./PieComponent";
import BarComponent from "./BarComponent";
import Histogram from "./Histogram";

const DEFAULT_DAYS = 30;

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
}));

export default function StatsDashboardContainer() {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [stats, setStats] = useState({});
    const [isFetching, setIsFectching] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsSidebarOpen(!isSidebarOpen);
    };


    const handleSubmit = async (days) => {
        let request = generateRequest(days);
        const response = await fetch(request);
        const data = await response.json();
        setStats(data);
        setIsFectching(false);
    }

    useEffect(() => {
        handleSubmit(DEFAULT_DAYS);
    }, []);


    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        (isFetching)
            ?
            <div/>
            :

            <div className={classes.root}>
                {/*<CssBaseline />*/}
                {/*<AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>*/}
                {/*<Toolbar className={classes.toolbar}>*/}
                {/*    <IconButton*/}
                {/*        edge="start"*/}
                {/*        color="inherit"*/}
                {/*        aria-label="open drawer"*/}
                {/*        onClick={handleDrawerOpen}*/}
                {/*        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}*/}
                {/*    >*/}
                {/*        <MenuIcon />*/}
                {/*    </IconButton>*/}
                {/*    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>*/}
                {/*        Dashboard*/}
                {/*    </Typography>*/}
                {/*    <IconButton color="inherit">*/}
                {/*        <Badge badgeContent={4} color="secondary">*/}
                {/*            <NotificationsIcon />*/}
                {/*        </Badge>*/}
                {/*    </IconButton>*/}
                {/*</Toolbar>*/}
                {/*</AppBar>*/}

                <SwipeableDrawer
                    anchor={'bottom'}
                    open={isSidebarOpen}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    <div
                        className={clsx(classes.list, {
                            [classes.fullList]: true
                        })}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </div>

                </SwipeableDrawer>

                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>

                    <Container maxWidth="lg" className={classes.container}>
                        <Button onClick={toggleDrawer(true)}>Bottom</Button>

                        <Grid container spacing={3}>
                            {/* Chart uploaded videos*/}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper className={fixedHeightPaper}>
                                    <Chart
                                        data={stats["last_days_uploaded_videos"]}
                                        title={"Uploaded videos in the last " + DEFAULT_DAYS + " days"}
                                        ylabel={"Videos"}
                                    />
                                </Paper>
                            </Grid>
                            {/* cumulative info */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper className={fixedHeightPaper}>
                                    <CumulativeComponent
                                        cumulative={sum(stats["last_days_uploaded_videos"]) + " videos"}
                                        title={"Videos in the last " + DEFAULT_DAYS + " days"}
                                        text={"Since " + Moment().subtract(DEFAULT_DAYS, 'days').format('LL')}
                                    />
                                </Paper>
                            </Grid>
                            {/* Chart registered users*/}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper className={fixedHeightPaper}>
                                    <Chart
                                        data={stats["last_days_user_registrations"]}
                                        title={"Registered users in the last " + DEFAULT_DAYS + " days"}
                                        ylabel={"Users"}
                                    />
                                </Paper>
                            </Grid>
                            {/* cumulative info */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper className={fixedHeightPaper}>
                                    <CumulativeComponent
                                        cumulative={sum(stats["last_days_user_registrations"]) + " users"}
                                        title={"Registrations in the last " + DEFAULT_DAYS + " days"}
                                        text={"Since " + Moment().subtract(DEFAULT_DAYS, 'days').format('LL')}
                                    />
                                </Paper>
                            </Grid>
                            {/* Chart users logins*/}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper className={fixedHeightPaper}>
                                    <Chart
                                        data={stats["last_days_users_logins"]}
                                        title={"Login users in the last " + DEFAULT_DAYS + " days"}
                                        ylabel={"Users"}
                                    />
                                </Paper>
                            </Grid>
                            {/* cumulative info */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper className={fixedHeightPaper}>
                                    <CumulativeComponent
                                        cumulative={sum(stats["last_days_users_logins"]) + " users"}
                                        title={"Logins in the last " + DEFAULT_DAYS + " days"}
                                        text={"Since " + Moment().subtract(DEFAULT_DAYS, 'days').format('LL')}
                                    />
                                </Paper>
                            </Grid>
                            {/* Chart api call amount*/}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper className={fixedHeightPaper}>
                                    <Chart
                                        data={stats["last_days_api_call_amount"]}
                                        title={"API calls in the last " + DEFAULT_DAYS + " days"}
                                        ylabel={"API calls"}
                                    />
                                </Paper>
                            </Grid>
                            {/* cumulative info */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper className={fixedHeightPaper}>
                                    <CumulativeComponent
                                        cumulative={sum(stats["last_days_api_call_amount"]) + " API calls"}
                                        title={"API calls in the last " + DEFAULT_DAYS + " days"}
                                        text={"Since " + Moment().subtract(DEFAULT_DAYS, 'days').format('LL')}
                                    />
                                </Paper>
                            </Grid>
                            {/* Sankey chart api call amount*/}
                            <Grid item xs={12}>
                                <Paper style={{height:600}} className={fixedHeightPaper}>
                                    <Sankey
                                        data={stats["last_days_api_calls_by_path"]}
                                        title={"API calls in the last " + DEFAULT_DAYS + " days"}
                                        ylabel={"API calls"}
                                    />
                                </Paper>
                            </Grid>
                            {/* Pie chart api call amount*/}
                            <Grid item xs={12}>
                                <Paper style={{height:600}} className={fixedHeightPaper}>
                                    <PieComponent
                                        data={stats["last_days_api_calls_by_path"]}
                                        title={"API calls in the last " + DEFAULT_DAYS + " days"}
                                        ylabel={"API calls"}
                                    />
                                </Paper>
                            </Grid>
                            {/* Bar chart api call amount*/}
                            <Grid item xs={12}>
                                <Paper style={{height:600}} className={fixedHeightPaper}>
                                    <BarComponent
                                        data={stats["last_days_api_calls_by_path"]}
                                        title={"API calls in the last " + DEFAULT_DAYS + " days"}
                                        ylabel={"API calls"}
                                    />
                                </Paper>
                            </Grid>
                            {/* Bar chart api call amount by method*/}
                            <Grid item xs={12}>
                                <Paper style={{height:600}} className={fixedHeightPaper}>
                                    <BarComponent
                                        data={stats["last_days_api_calls_by_method"]}
                                        title={"API calls by method in the last " + DEFAULT_DAYS + " days"}
                                        ylabel={"API calls"}
                                    />
                                </Paper>
                            </Grid>
                            {/* Bar chart api call amount by method*/}
                            <Grid item xs={12}>
                                <Paper style={{height:600}} className={fixedHeightPaper}>
                                    <Histogram
                                        data={stats["last_days_api_calls_response_times_sample"]}
                                        title={"Histogram of API call response time in the last" + DEFAULT_DAYS + " days."}
                                        subtitle={"Response times over 0.2 seconds where filtered due to low amount of samples."}
                                        ylabel={"API calls"}
                                    />
                                </Paper>
                            </Grid>

                        </Grid>
                        <Box pt={4}>
                            <Copyright/>
                        </Box>
                    </Container>
                </main>
            </div>
    );
}