import React, {createContext, Dispatch, SetStateAction, useContext, useMemo, useState} from "react";

/**
 * Supports creation of Context Provider, state and a set of constrained state manipulations (ie. actions).
 *
 * @param actions set of actions that can be applied to this context
 * @param initialState initial context state
 */
export function createContexStateProvider<State, Actions>(actions: (_: Dispatch<SetStateAction<State>>) => Actions,
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

        return (
            <ContextActions.Provider value={useMemo(() => actions(setState), [setState])}>
                <ContextState.Provider value={state}>
                    {children}
                </ContextState.Provider>
            </ContextActions.Provider>
        );
    };

    return {Provider, useContextState, useContextActions, useContextAll};
}
