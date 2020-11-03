import React from "react";
import UserCard from "./UserCard";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import * as UserContext from '../../../context/UserContext'
import {values} from "lodash";

const UsersList: React.FunctionComponent = () => {
    const {users} = UserContext.useContextState();
    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.root}>
            {
                values(users).map(user => {
                    return (
                        <UserCard user={user} key={user.id}/>
                    );
                })
            }
        </Paper>
    );
};

const useStyles = makeStyles({
    root: {
        maxHeight: 800,
        width: 300,
        overflow: 'auto',
        scrollbarWidth: 'none',     // hide scroll bar - Firefox
        msOverflowStyle: 'none',    // hide scroll bar - IE, Edge
        '&::-webkit-scrollbar': {   // hide scroll bar - Chrome, Safari and Opera
            display: 'none'
        }
    },
});

export default UsersList;
