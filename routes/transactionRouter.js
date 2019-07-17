const Router = require( 'express' ).Router();
const { findAll, findById, create, update, remove } = require( '../controllers/TransactionController' );
const authenticate = require( '../utils/authenticate' );

//USE AUTH MIDDLEWARE
Router.use( '/', authenticate );

//TRANSACTION ROUTES
Router.get( '/', findAll) ;
Router.post( '/', create );
Router.get( '/:transactionId', findById );
Router.put( '/:transactionId', update );
Router.delete( '/:transactionId',  remove );

module.exports = Router;