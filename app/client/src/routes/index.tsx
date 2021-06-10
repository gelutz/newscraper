import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Route";

import Home from "../pages/Home";

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            {/* <Route path="/test" component={TeacherForm} isPrivate /> */}
        </Switch>
    );
}

export default Routes;
