import axios from 'axios';
import * as Types from './types';

export const getTransactions = () => dispatch => {
    axios.get('/api/transaction/')
        .then(response => {
            dispatch({
                type: Types.GET_TRANSACTIONS,
                payload: {
                    transactions: response.data
                }
            })
        })
        .catch(error => {
            console.log(error);
        });
}

export const createTransaction = transaction => dispatch => {
    axios.post('/api/transaction/', transaction)
        .then(response => {
            console.log(response);
            dispatch({type: Types.CREATE_TRANSACTION, payload: { transaction: response.data}});
        })
        .catch(error => {
            console.log(error);
        });
}

export const updateTransaction = (id, transaction) => dispatch => {
    axios.put(`/api/transaction/${id}`, transaction)
        .then(response => {
            dispatch({type: Types.UPDATE_TRANSACTION, payload: {transaction: response.data.transaction}});
        })
        .catch(error => {
            console.log(error);
        });
}

export const removeTransaction = id => dispatch => {

    axios.delete(`/api/transaction/${id}`)
        .then(response => {
            dispatch({type: Types.REMOVE_TRANSACTION, payload: {id: response.data._id}});
        })
        .catch(error => {
            console.log(error);
        });
}