const Router = require( 'express' ).Router();
const { login, register } = require( '../controllers/userController' );

Router.post( '/login',  login);
Router.post( '/register',  register);

module.exports = Router;