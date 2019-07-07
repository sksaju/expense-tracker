const bcrypt = require( 'bcrypt' );
const User = require( '../model/user' );
const { registerValidator } = require( '../validators/userValidator' );
const  UserController = {
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
            User.findOne( { email } )
                .then( user => {
                    if( user ) {
                        res.status( 400 ).json( { message: "Email already exists!" } );
                    }
                    bcrypt.hash( password, 11, ( err, hash ) => {
                        if( err ) {
                            res.status( 500 ).json( { message: "Internal server error!" } );
                        }
                        let user = new User({ name, email, password: hash });
                        user.save()
                            .then( user => {
                                res.status( 200 ).json( { message: "Registration successful" } );
                            })
                            .catch( error => {
                                res.status( 500 ).json( { message: "Internal server error!" } );
                            })
                    })
                })
                .catch( error => {
                    res.status( 500 ).json( { message: "Internal server error!" } );
                })
        }
    }
}

module.exports = UserController;