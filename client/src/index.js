import React from 'react';
import ReactDOM from 'react-dom';
import jwtDecode from 'jwt-decode'
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import * as Types from './actions/types';
import setAuthHeaderToken from './utils/setAuthHeaderToken';

import App from './components/app';
import rootReducer  from './reducers';
const store = createStore( rootReducer, compose( 
    applyMiddleware( reduxThunk ), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
));

const token = localStorage.getItem( 'auth_token' );
if ( token ) {
    setAuthHeaderToken( token );
    store.dispatch({
        type: Types.SET_USER,
        payload: {
            user: jwtDecode( token )
        }
    });
}

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
