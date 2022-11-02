import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import Register from "./containers/register/Register.jsx";
import Login from "./containers/login/Login.jsx";
import Main from "./containers/main/Main.jsx";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        {/* Main is the default component: when it does not match the previous two paths,
         the default component will be displayed */}
        <Route component={Main}></Route>
      </Switch>
    </div>
  );
}
