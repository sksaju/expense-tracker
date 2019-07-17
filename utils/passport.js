const { Strategy, ExtractJwt } = require( 'passport-jwt' );
const User = require( '../models/User' );

const params = {};
params.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
params.secretOrKey = 'SECRET';

module.exports = passport => {
    passport.use( new Strategy( params, ( payload, done ) => {
        User.findOne( { _id: payload._id } )
            .then( user => {
                console.log(user)
                return ( !user ) ? done( null, false ) : done( null, user );
            })
            .catch( error => {
                console.log( error );
                done( error );
            })
    }));
}