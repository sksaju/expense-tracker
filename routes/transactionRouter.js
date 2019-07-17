const Router = require( 'express' ).Router();
const { findAll, findById, create, update, remove } = require( '../controllers/TransactionController' );

Router.get( '/',  findAll);
Router.get( '/:transactionId',  findById);
Router.post( '/',  create);
Router.put( '/:transactionId',  update);
Router.delete( '/:transactionId',  remove);

module.exports = Router;