import {CircularProgress} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const ProgressSpinner = () => {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            <CircularProgress size='3rem' />
        </div>
    );
};

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300
    }
});

export default ProgressSpinner;

