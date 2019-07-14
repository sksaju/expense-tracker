import axios from 'axios';

const setAuthHeaderToken = token => {
    if( token ) {
        axios.defaults.headers.common[ 'Authorization' ] = token;
    } else {
        axios.defaults.headers.common[ 'Authorization' ] = '';
    }
}

export default setAuthHeaderToken;