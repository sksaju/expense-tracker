import React from 'react';
import { connect } from 'react-redux';
import { getTransactions, removeTransaction } from '../actions/transactionActions';
import CreateTransaction from '../components/transaction/create';


class Dashboard extends React.Component {

    state = {
        transactions: [],
        createModalOpen: false,
        updateModalOpen: false,
        id: ''
    };

    openCreateModal = () => {
        this.setState({
            createModalOpen: true
        });
    }

    closeCreateModal = () => {
        this.setState({
            createModalOpen: false
        });
    }

    openUpdateModal = (id) => {
        this.setState({
            updateModalOpen: true,
            id
        });
    }

    closeUpdateModal = () => {
        this.setState({
            updateModalOpen: false,
            id: ''
        });
    }


    componentDidMount() {
        this.props.getTransactions();
    }

    render() {
        let { auth, transactions } = this.props;
        return (
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h1>Welcome {auth.user.name} </h1>
                    <p>You Email is {auth.user.email} </p>
                    <br />
                    <h1>Transactions: <button className='btn btn-primary float-right' onClick={this.openCreateModal}>Add New Transaction</button></h1>
                    <CreateTransaction
                        isOpen={this.state.createModalOpen}
                        close={this.closeCreateModal}
                    />
                    { transactions.length > 0 ? <ul className='list-group'>
                        {
                            transactions.map(transaction => (
                                <li
                                    key={transaction._id}
                                    className='list-group-item'>
                                    <p>Type: {transaction.type}</p>
                                    <p>Amount: {transaction.amount}</p>
                                </li>
                            ))
                        }
                    </ul> : <p>There is no transaction</p>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    transactions: state.transactions
})

export default connect( mapStateToProps, { getTransactions, removeTransaction } )( Dashboard );