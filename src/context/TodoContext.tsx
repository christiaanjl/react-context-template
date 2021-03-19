import Dictionary from "../models/Dictionary";
import Todo from "../models/Todo";
import Status from "../constants/Status";
import {keyBy} from 'lodash';
import {StateActions, createContextStateProvider} from "./createContextStateProvider";
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


const todoActions = ({mergeState, deepMerge}: StateActions<Todos>) => ({
    setTodos: (todos: Todo[]) => {
        mergeState({todos: keyBy(todos, 'id')});
    },
    setStatus: (fetchStatus: Status) => {
        mergeState({fetchStatus});
    },
    setCompleted: (id: number, completed: boolean) => {
        deepMerge({todos: {[id]: {completed}}});
    },
    fetchTodos: (id: number) => {
        mergeState({fetchStatus: Status.BUSY});
        callAsync<Todo[]>(() => api.fetchTodos(id),
                         (todos: Todo[]) => mergeState({
                             fetchStatus: Status.SUCCESS,
                             todos: keyBy(todos, 'id')
                         }),
                         (_ : string) => mergeState({fetchStatus: Status.FAILED}));
   }
});


export const {
    Provider,
    useContextState,
    useContextActions,
    useContextAll
} = createContextStateProvider<Todos, ReturnType<typeof todoActions>>(todoActions, INITIAL_STATE);
