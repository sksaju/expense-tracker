const Transaction = require('../model/transaction');
const User = require('../model/user');
const { serverError } = require('../utils/error');

class TransactionController {

    /**
     * constructor function
     * @constructor
     */
    constructor() {
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    /**
     * Get all transactions
     * @param     {object}  req
     * @param     {object}  res
     * @access    public
     * @return    {json} mixed
     */
    findAll( req, res ) {
        let { _id } = req.user;
        Transaction.find( { author: _id } )
            .then( transactions => {
                if ( transactions.length === 0 ) {
                    res.status( 200 ).json({
                        message: 'No Transaction Found'
                    });
                } else {
                    res.status( 200 ).json( transactions );
                }
            })
            .catch( error => serverError( res, error ) );
    }

    /**
     * Get single transaction by id
     * @param     {object}  req
     * @param     {object}  res
     * @access    public
     * @return    {json} mixed
     */
    findById( req, res ) {
        let { transactionId } = req.params;
        Transaction.findById( transactionId )
            .then( transaction => {
                if ( !transaction ) {
                    res.status( 200 ).json({
                        message: 'No Transaction Found'
                    });
                } else {
                    res.status( 200 ).json( transaction );
                }
            })
            .catch( error => serverError( res, error ) );
    }

    /**
     * Create transaction
     * @param     {object}  req
     * @param     {object}  res
     * @access    public
     * @return    {json} mixed
     */
    create( req, res, next ) {
        let { amount, note, type } = req.body;
        let userId = req.user._id;

        let transaction = new Transaction({
            amount, note, type, author: userId
        });

        transaction.save()
            .then( trans => {
                let updatedUser = { ...req.user._doc };
                if ( type === 'income' ) {
                    updatedUser.balance = updatedUser.balance + amount;
                    updatedUser.income = updatedUser.income + amount;
                } else if ( type === 'expense' ) {
                    updatedUser.balance = updatedUser.balance - amount;
                    updatedUser.expense = updatedUser.expense + amount;
                }
                updatedUser.transactions.unshift( trans._id );
                
                User.findByIdAndUpdate( updatedUser._id, { $set: updatedUser }, { new: true } )
                    .then( result => {
                        res.status( 200 ).json({
                            message: 'Transaction Created Successfully',
                            ...trans._doc,
                            user: result
                        })
                    })
                    .catch( error => serverError( res, error ) );
                
            })
            .catch(error => serverError(res, error));
    }

    /**
     * Update transaction
     * @param     {object}  req
     * @param     {object}  res
     * @access    public
     * @return    {json} mixed
     */
    update( req, res ) {
        let { transactionId } = req.params
        Transaction.findOneAndUpdate({ _id: transactionId }, { $set: req.body }, {new: true})
            .then(result => { 
                res.status(200).json({
                    message: 'Updated Successfully',
                    transaction: result
                })
            })
            .catch(error => serverError(res, error))
    }

    /**
     * Delete transaction
     * @param     {object}  req
     * @param     {object}  res
     * @access    public
     * @return    {json} mixed
     */
    delete(req, res) {
        let { transactionId } = req.params
        Transaction.findOneAndDelete({ _id: transactionId })
            .then(result => {
                res.status(200).json({
                    message: 'Deleted Successfully',
                    ...result._doc
                })
            })
            .catch(error => serverError(res, error))
    }
}

module.exports = new TransactionController();