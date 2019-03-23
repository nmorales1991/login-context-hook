import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"; //rutas
import Dashboard from "./containers/Dashboard";
import Login from "./pages/Authentication/Login";
import AuthState from "./context/AuthState"; // estado global usando context api

const App = () => {
    return (
        <AuthState>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Dashboard} />
                </Switch>
            </BrowserRouter>
        </AuthState>
    );
};

export default App;
