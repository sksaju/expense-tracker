const Router = require( 'express' ).Router();
const UserController = require( '../controllers/userController' );

Router.post( '/login',  UserController.login);
Router.post( '/register',  UserController.register);

module.exports = Router;