import React from 'react';
import User from "../../../models/User";
import {makeStyles} from "@material-ui/core/styles";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import * as UserContext from '../../../context/UserContext'
import * as TodoContext from '../../../context/TodoContext'

interface IProps {
    user: User
}

const UserCard: React.FunctionComponent<IProps> = (props) => {
    const {name, email, phone, website, id} = props.user;

    const classes = useStyles();
    const [userState, userActions] = UserContext.useContextAll();
    const todoActions = TodoContext.useContextActions();

    return (
        <Card variant="outlined"
              className={userState.selectedUser === id ? classes.cardSelected : classes.card}
              onClick={() => {
                  userActions.setSelectedUser(id);
                  todoActions.fetchTodos(id);
              }}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography className={classes.email} color="textSecondary">
                    {email}
                </Typography>
                <Typography variant="body2" component="p">
                    {phone}
                    <br />
                    {website}
                </Typography>
            </CardContent>
        </Card>
    );
};

const useStyles = makeStyles({
    card: {
        backgroundColor: '#f2f8ff'
    },
    cardSelected: {
        backgroundColor: '#9bd0ff'
    },
    email: {
        marginBottom: 12,
    },
});

export default UserCard;
