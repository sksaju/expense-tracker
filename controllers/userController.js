const { registerValidator } = require( '../validators/userValidator' );
const User = {
    login( req, res ) {
        res.json({
            message: "login"
        });
    },

    register( req, res ) {
        const { name, email, password, confirmPassword } = req.body;
        const validator = registerValidator( req.body );

        if( !validator.isValid ) {
            res.status( 400 ).json( validator.error );
        } else {
            res.status( 200 ).json( { message: "All is well" } );
        }
    }
}

module.exports = User;