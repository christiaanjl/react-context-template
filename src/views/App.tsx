import React from 'react';
import UsersPage from "./users-page/UsersPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider as UserContextProvider} from '../context/UserContext'
import {Provider as TodoContextProvider} from "../context/TodoContext";

function App() {
  return (
      <BrowserRouter>
          <Switch>
            <Route exact path="/">
                <UserContextProvider>
                    <TodoContextProvider>
                        <UsersPage />
                    </TodoContextProvider>
                </UserContextProvider>
            </Route>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
