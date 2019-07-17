class Error {
    /**
     * server error
     * @param     {object}  res
     * @param     {object}  err
     * @access    public
     * @return    {json} mixed
     */
    serverError( res, err ) {
        console.log( err );
        res.status( 500 ).json({ 
            message: "Internal server error!"
         });
    }

    /**
     * resource error
     * @param     {object}  res
     * @param     {object}  err
     * @access    public
     * @return    {json} mixed
     */
    resourceError( res, err ) {
        res.status( 400 ).json({ 
            message: err
        });
    }
}

module.exports = new Error();