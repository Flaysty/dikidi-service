import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import './styles/App.css';

import Routes from './routes'

const App = (
    <>
        <Routes />
    </>
);

ReactDOM.render(
    App,
    document.getElementById('app')
);