import React, {useEffect} from 'react';
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import UsersList from "./components/UsersList";
import * as UserContext from '../../context/UserContext';
import TodoList from "./components/TodoList";

const UsersPage: React.FunctionComponent = () => {
    const classes = useStyles();
    const {fetchUsers} = UserContext.useContextActions();

    useEffect(() => {
        fetchUsers()
        // eslint-disable-next-line
    }, []);

    return (
        <Container fixed className={classes.root}>
            <UsersList />
            <TodoList />
        </Container>
    );
};


const useStyles = makeStyles({
    root: {
        display: 'flex'
    },
});


export default UsersPage;
