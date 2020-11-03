import React from "react";
import Paper from "@material-ui/core/Paper";
import TodoCard from "./TodoCard";
import Header from "../../components/Header";
import {makeStyles} from "@material-ui/core/styles";
import ProgressSpinner from "../../components/ProgressSpinner";
import Status from "../../../constants/Status";
import {useContextState} from '../../../context/TodoContext'
import {values} from 'lodash';

const TodoList: React.FunctionComponent = () => {
    const classes = useStyles();
    const {todos, fetchStatus} = useContextState();

    if(fetchStatus === Status.BUSY) {
        return <ProgressSpinner />
    } else if (fetchStatus === Status.SUCCESS) {
        return <Paper elevation={3} className={classes.root}>
                    <Header title="To do" />
                    {
                        values(todos).map(todo => {
                            return (
                                <TodoCard todo={todo} key={todo.id}/>
                            );
                        })
                    }
                </Paper>
    } else {
        return <div />
    }
};

const useStyles = makeStyles({
    root: {
        maxHeight: 800,
        width: 300,
        overflow: 'auto'
    }
});

export default TodoList;
