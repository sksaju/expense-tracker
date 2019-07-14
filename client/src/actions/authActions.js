import axios from 'axios';
import jwtDecode from 'jwt-decode'
import setAuthHeaderToken from '../utils/setAuthHeaderToken'
import * as Types from './types';

export const register = ( user, history ) => dispatch => {
    axios.post('/api/user/register', user)
        .then( res => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: {}
                }
            });
            history.push('/login');
        })
        .catch( err => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: err.response.data
                }
            });
        });
}

export const login = ( user, history ) => dispatch => {
    axios.post('api/user/login', user)
        .then( res => {
            const token = res.data.token;
            localStorage.setItem( 'auth_token', token );
            setAuthHeaderToken( token );
            dispatch({
                type: Types.SET_USER,
                payload: {
                    user: jwtDecode( token )
                }
            });
            history.push('/');
        })
        .catch( err => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: err.response.data
                }
            });
        });
}

export const logout = history => {
    localStorage.removeItem('auth_token');
    history.push('/login');
    return {
        type: Types.SET_USER,
        payload: {
            user: {}
        }
    };
}