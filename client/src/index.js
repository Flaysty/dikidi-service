import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import jwt from 'jsonwebtoken'

import 'semantic-ui-css/semantic.min.css'
import './styles/App.css'
import Routes from './routes'
import setAuthorizationToken from './utils/setAuthorizationToken'
import rootReducer from './reducers/rootReducer'
import { setCurrentUser } from './actions/loginActions'

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
)

if (localStorage.token) {
    setAuthorizationToken(localStorage.token, localStorage.refreshToken);
    store.dispatch(setCurrentUser(jwt.decode(localStorage.token)))
}

const App = (
    <Provider store={store}>
        <Routes />
    </Provider>
);

ReactDOM.render(
    App,
    document.getElementById('app')
);