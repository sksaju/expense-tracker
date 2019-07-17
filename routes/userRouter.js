const Router = require( 'express' ).Router();
const { login, register } = require( '../controllers/UserController' );

//USER ROUTES
Router.post( '/login', login );
Router.post( '/register', register );

module.exports = Router;