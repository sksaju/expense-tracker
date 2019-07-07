const UserValidator = {
    registerValidator( input ) {
        let error = {};
        if( !input.name ) {
            error.name = "Please enter your name";
        }
        if( !input.email ) {
            error.email = "Please enter your email";
        }
        if( !input.password ) {
            error.password = "Please enter your password";
        } else if( input.password.length < 6 ) {
            error.password = "Password must be greater or equal 6 character";
        }
        if( !input.confirmPassword ) {
            error.confirmPassword = "Please confirm your password";
        } else if( input.password !== input.confirmPassword ) {
            error.confirmPassword = "Password doesn't match";
        }

        return { error, isValid: Object.keys( error ).length === 0 }
    }
}

module.exports = UserValidator;