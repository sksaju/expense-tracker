const Router = require( 'express' ).Router();
const { findAll, findById, create, update, remove } = require( '../controllers/TransactionController' );
const authenticate = require( '../utils/authenticate' );

Router.use( '/', authenticate);

Router.get( '/', findAll);
Router.get( '/:transactionId',  findById);
Router.post( '/',  create);
Router.put( '/:transactionId',  update);
Router.delete( '/:transactionId',  remove);

module.exports = Router;