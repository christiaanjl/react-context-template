import Dictionary from "../models/Dictionary";
import Todo from "../models/Todo";
import Status from "../constants/Status";
import {Dispatch, SetStateAction} from "react";
import {keyBy, merge} from 'lodash';
import {createContexStateProvider} from "./createContextStateProvider";
import {callAsync} from "../utilities/callAsync";
import * as api from '../api/remoteApi'

interface Todos {
    todos: Dictionary<Todo>
    fetchStatus: Status
}

const INITIAL_STATE: Todos = {
    todos: {},
    fetchStatus: Status.INIT
};


const todoActions = (setState: Dispatch<SetStateAction<Todos>>) => ({
    setTodos: (todos: Todo[]) => {
       setState((state) => ({
           ...state,
           todos: keyBy(todos, 'id')
       }));
    },
    setStatus: (fetchStatus: Status) => {
       setState((state) => ({
           ...state,
           fetchStatus
       }));
    },
    setCompleted: (id: number, completed: boolean) => {
        setState((state) => (
            merge({}, state, {
                todos: {
                    [id]: {completed}
                }
        })));
    },
    fetchTodos: (id: number) => {
       setState((state) => ({
           ...state,
           fetchStatus: Status.BUSY
       }));
       callAsync<Todo[]>(() => api.fetchTodos(id),
                         (todos: Todo[]) => setState((state) => ({
                             ...state,
                             fetchStatus: Status.SUCCESS,
                             todos: keyBy(todos, 'id')
                         })),
                         (_ : string) => setState((state) => ({
                             ...state,
                             fetchStatus: Status.FAILED
                         })));
   }
});


export const {
    Provider,
    useContextState,
    useContextActions,
    useContextAll
} = createContexStateProvider<Todos, ReturnType<typeof todoActions>>(todoActions, INITIAL_STATE);
