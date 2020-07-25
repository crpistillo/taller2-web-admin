import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Deposits(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>{props.title}</Title>
            <Typography component="p" variant="h4">
                {props.cummulate}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                {props.text}
            </Typography>
        </React.Fragment>
    );
}