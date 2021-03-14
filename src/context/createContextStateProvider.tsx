import React, {createContext, Dispatch, SetStateAction, useContext, useMemo, useState} from "react";
import {merge} from 'lodash';

export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

export type ContextActions<State>  = {
    setState: Dispatch<SetStateAction<State>>;
    mergeState: Dispatch<SetStateAction<RecursivePartial<State>>>;
    deepMerge: Dispatch<SetStateAction<RecursivePartial<State>>>;
}

/**
 * Supports creation of Context Provider, state and a set of constrained state manipulations (ie. actions).
 *
 * @param actions set of actions that can be applied to this context
 * @param initialState initial context state
 */
export function createContexStateProvider<State, Actions>(actions: (_: ContextActions<State>) => Actions,
                                                          initialState: State) {

    const ContextState = createContext<State | undefined>(undefined);
    const ContextActions = createContext<Actions | undefined>(undefined);

    const useContextState = (): State => {
        const context = useContext(ContextState);
        if (context !== undefined) {
            return context;
        } else {
            throw Error("Context for State must be provided");
        }
    };

    const useContextActions = (): Actions => {
        const context = useContext(ContextActions);
        if (context !== undefined) {
            return context;
        } else {
            throw Error("Context for Actions must be provided");
        }
    };

    const useContextAll = (): [State, Actions] => {
        return [useContextState(), useContextActions()];
    };

    const Provider: React.FunctionComponent = ({children}) => {
        const [state, setState] = useState<State>(initialState);

        const stateActions = useMemo(() => {
            const mergeState = (setStateAction: SetStateAction<State>) => {
                if(typeof(setStateAction) === 'function') {
                    // @ts-ignore
                    setState((oldState: State) => ({...oldState, ...setStateAction(oldState)}) );
                } else {
                    setState((oldState: State) => ({...oldState, ...setStateAction}));
                }
            };
            const deepMerge = (setStateAction: SetStateAction<State>) => {
                if(typeof(setStateAction) === 'function') {
                    // @ts-ignore
                    setState((oldState: State) => merge({}, oldState, setStateAction(oldState)));
                } else {
                    setState((oldState: State) => merge({}, oldState, setStateAction));
                }
            };
            return actions({setState, mergeState, deepMerge});
        }, [setState]);

        return (
            <ContextActions.Provider value={stateActions}>
                <ContextState.Provider value={state}>
                    {children}
                </ContextState.Provider>
            </ContextActions.Provider>
        );
    };

    return {Provider, useContextState, useContextActions, useContextAll};
}
