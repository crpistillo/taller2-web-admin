import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {mainListItems, secondaryListItems} from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import {GET_STATS_ENDPOINT} from "../../vars/endpoints";

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

function totalVideosSubidos(json_data) {
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
                {/*    <Toolbar className={classes.toolbar}>*/}
                {/*        <IconButton*/}
                {/*            edge="start"*/}
                {/*            color="inherit"*/}
                {/*            aria-label="open drawer"*/}
                {/*            onClick={handleDrawerOpen}*/}
                {/*            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}*/}
                {/*        >*/}
                {/*            <MenuIcon />*/}
                {/*        </IconButton>*/}
                {/*        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>*/}
                {/*            Dashboard*/}
                {/*        </Typography>*/}
                {/*        <IconButton color="inherit">*/}
                {/*            <Badge badgeContent={4} color="secondary">*/}
                {/*                <NotificationsIcon />*/}
                {/*            </Badge>*/}
                {/*        </IconButton>*/}
                {/*    </Toolbar>*/}
                {/*</AppBar>*/}
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>{mainListItems}</List>
                    <Divider/>
                    <List>{secondaryListItems}</List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper className={fixedHeightPaper}>
                                    <Chart
                                        data={stats["last_days_uploaded_videos"]}
                                        title={"Videos subidos en los últimos " + DEFAULT_DAYS + " días"}
                                        ylabel={"Cantidad de videos"}
                                    />
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper className={fixedHeightPaper}>
                                    <Deposits
                                        totalVideosSubidos={totalVideosSubidos(stats["last_days_uploaded_videos"])}
                                    />
                                </Paper>
                            </Grid>
                            {/* Chart */}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper className={fixedHeightPaper}>
                                    <Chart/>
                                </Paper>
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Orders/>
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