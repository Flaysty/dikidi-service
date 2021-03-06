import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginPage from '../components/Authorization/LoginPage';
import Home from '../components/Home/HomePage';
import StudioPage from '../components/Studio/StudioPage';
import SettingsPage from '../components/Settings/SettingsPage';
import requireAuth from '../utils/requireAuth'
import noAuthRequire from '../utils/no_requireAuth'

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={requireAuth(Home)} />
            <Route path="/login" exact component={noAuthRequire(LoginPage)} />
            <Route path="/settings" exact component={requireAuth(SettingsPage)} />
            <Route path="/studio/:studioId" exact component={requireAuth(StudioPage)} />
        </Switch>
    </BrowserRouter>
)