import React from 'react';
import { withStyles } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { CallToAction } from '@material-ui/icons';

const styles = theme => ({
    root:{
        flexGrow: 1,
    },
    paper:{
        ppading: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
});

export default function UnderstandingBreakpoints() {
    const classes = styles;

    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={2}>
                    <Paper className={classes.paper}>xs = 12, sm = 9, md = 3</Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Paper className={classes.paper}>xs = 12, sm = 6, md = 3</Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Paper className={classes.paper}>xs = 12, sm = 6, md = 3</Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Paper className={classes.paper}>xs = 12, sm = 6, md = 3</Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Paper className={classes.paper}>xs = 12, sm = 6, md = 3</Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Paper className={classes.paper}>xs = 12, sm = 6, md = 3</Paper>
                </Grid>
            </Grid>
        </div>
    );
}

{/*
const UnderstandingBreakpoints = withStyles(styles)(({ classes }) => (
    <div className={classes.root}>
        <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
                <Paper className={classes.paper}>xs = 12, sm = 6, md = 3</Paper>
            </Grid>


        </Grid>
    </div>
));*/}