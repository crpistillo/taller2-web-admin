import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function CumulativeComponent(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>{props.title}</Title>
            <Typography component="p" variant="h4">
                {props.cumulative}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                {props.text}
            </Typography>
        </React.Fragment>
    );
}