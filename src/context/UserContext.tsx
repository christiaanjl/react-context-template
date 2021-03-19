import Dictionary from "../models/Dictionary";
import Status from "../constants/Status";
import {keyBy} from 'lodash';
import {StateActions, createContextStateProvider} from "./createContextStateProvider";
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


const userActions = ({mergeState}: StateActions<Users>) => ({
    setUsers: (users: User[]) => {
        mergeState({users: keyBy(users, 'id')});
    },
    setStatus: (fetchStatus: Status) => {
        mergeState({fetchStatus});
    },
    setSelectedUser: (userId: number) => {
        mergeState({selectedUser: userId});
    },
    fetchUsers: () => {
        mergeState({fetchStatus: Status.BUSY});
        callAsync(() => api.fetchUsers(),
                  (users: User[]) => mergeState({
                      fetchStatus: Status.SUCCESS,
                      users: keyBy(users, 'id')
                  }),
                  (_: string) => mergeState({fetchStatus: Status.FAILED}))
    }
});

export const {
    Provider,
    useContextState,
    useContextActions,
    useContextAll
} = createContextStateProvider<Users, ReturnType<typeof userActions>>(userActions, INITIAL_STATE);
