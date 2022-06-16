import { Routes as Switch } from 'react-router'
import Route from './Route';

import Home from '../pages/Home';
import Login from '../pages/Login/';

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} isPrivate />
            <Route path="/login" component={Login} />
        </Switch>
    );
}

export default Routes;
