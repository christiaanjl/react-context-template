import Dictionary from "../models/Dictionary";
import Status from "../constants/Status";
import {Dispatch, SetStateAction} from "react";
import {keyBy} from 'lodash';
import {createContexStateProvider} from "./createContextStateProvider";
import User from "../models/User"
import * as api from "../api/remoteApi";
import {callAsync} from "../utilities/callAsync";

interface Users {
    users: Dictionary<User>
    fetchStatus: Status
    selectedUser?: number
}

const INITIAL_STATE: Users = {
    users: {},
    fetchStatus: Status.INIT
};


const userActions = (setState: Dispatch<SetStateAction<Users>>) => ({
    setUsers: (users: User[]) => {
        setState((state) => ({
            ...state,
            users: keyBy(users, 'id')
        }));
    },
    setStatus: (fetchStatus: Status) => {
        setState((state) => ({
            ...state,
            fetchStatus
        }));
    },
    setSelectedUser: (userId: number) => {
        setState((state) => ({
            ...state,
            selectedUser: userId
        }));
    },
    fetchUsers: () => {
        setState((state) => ({
            ...state,
            fetchStatus: Status.BUSY
        }));
        callAsync(() => api.fetchUsers(),
                  (users: User[]) => setState((state) => ({
                      ...state,
                      fetchStatus: Status.SUCCESS,
                      users: keyBy(users, 'id')
                  })),
                  (_: string) => setState((state) => ({
                      ...state,
                      fetchStatus: Status.FAILED
                  })))
    }
});

export const {
    Provider,
    useContextState,
    useContextActions,
    useContextAll
} = createContexStateProvider<Users, ReturnType<typeof userActions>>(userActions, INITIAL_STATE);
