import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginPage from '../components/Authorization/LoginPage';
import Home from '../components/Home';
import requireAuth from '../utils/requireAuth'
import noAuthRequire from '../utils/no_requireAuth'

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/login" exact component={noAuthRequire(LoginPage)} />
            <Route path="/home" exact component={requireAuth(Home)} />
        </Switch>
    </BrowserRouter>
)