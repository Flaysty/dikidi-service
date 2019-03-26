import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'


import 'semantic-ui-css/semantic.min.css'
import './styles/App.css'
import Routes from './routes'

const store = createStore(
    (state = {}) => state,
    applyMiddleware(thunk)
)

const App = (
    <Provider store={store}>
        <Routes />
    </Provider>
);

ReactDOM.render(
    App,
    document.getElementById('app')
);