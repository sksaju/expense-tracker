const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const User = require( '../model/user' );
const { loginValidator, registerValidator } = require( '../validators/userValidator' );
const { serverError, resourceError } = require( '../utils/error' );

const  UserController = {
    login( req, res ) {
        const { email, password } = req.body;
        const validator = loginValidator( req.body );

        if( !validator.isValid ) {
            return res.status( 400 ).json( validator.error );
        } else {
            User.findOne( { email } )
                .then( user => {
                    if( !user ) {
                        return resourceError( res, "User not found!" );
                    }
                    bcrypt.compare( password, user.password, ( err, result ) => {
                        if( err ) {
                            return serverError( res, err );
                        }

                        if( !result ) {
                            return resourceError( res, "Password not match" );
                        }

                        let token = jwt.sign({
                            _id: user._id,
                            name: user.name,
                            email: user.email
                        }, 'SECRET', { expiresIn: '2h' });

                        res.status( 200 ).json({
                            message: "Login successful",
                            token: `Bearer ${token}`
                        });
                    })
                })
                .catch( err => {
                    serverError( res, err );
                })
        }
    },

    register( req, res ) {
        const { name, email, password, confirmPassword } = req.body;
        const validator = registerValidator( req.body );

        if( !validator.isValid ) {
            return res.status( 400 ).json( validator.error );
        } else {
            User.findOne( { email } )
                .then( user => {
                    if( user ) {
                        return resourceError( res, "Email already exists!" );
                    }
                    bcrypt.hash( password, 11, ( err, hash ) => {
                        if( err ) {
                            return serverError( res, err );
                        }
                        let user = new User({ name, email, password: hash });
                        user.save()
                            .then( user => {
                                res.status( 200 ).json( { message: "Registration successful" } );
                            }) 
                            .catch( err => {
                                serverError( res, err );
                            })
                    })
                })
                .catch( err => {
                    serverError( res, err );
                });
        }
    }
}

module.exports = UserController;