const Error = {
    serverError( res, err ) {
        console.log( err );
        res.status( 500 ).json({ 
            message: "Internal server error!"
         });
    },
    resourceError( res, err ) {
        res.status( 400 ).json({ 
            message: err
        });
    }
}
module.exports = Error;