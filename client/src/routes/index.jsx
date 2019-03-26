import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import Home from '../components/Home';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/login" exact component={LoginForm} />
            <Route path="/home" exact component={Home} />
        </Switch>
    </BrowserRouter>
)