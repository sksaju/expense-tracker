const express = require( 'express' );

const app = express();
app.get( '/', ( req, res ) => {
    res.json({
        message: 'Welcome to our application'
    })
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>  {
    console.log( `SERVER is running on port ${PORT}` );
})