import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

function Header({title}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            { title }
        </div>
    );
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 'bold',
        padding: 10
    }
});

export default Header;
