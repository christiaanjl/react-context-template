import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Todo from "../../../models/Todo";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import IconButton from '@material-ui/core/IconButton';
import {useContextActions} from '../../../context/TodoContext'

interface IProps {
    todo: Todo
}

const TodoCard: React.FunctionComponent<IProps> = (props) => {
    const {todo: {id, completed}} = props;

    const classes = useStyles();
    const {setCompleted} = useContextActions();

    return (
        <div className={classes.root}>
            <IconButton onClick={() => setCompleted(id, !completed)}
                        disableRipple
                        className={classes.button}>
                { props.todo.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon /> }
            </IconButton>
            {
                <div style={{padding: 5}} >
                    { props.todo.title }
                </div>
            }
        </div>
    );
};

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    button: {
        "&:hover": {
            backgroundColor: "transparent"
        }
    }
});

export default TodoCard;
