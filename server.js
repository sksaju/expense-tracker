const express = require( 'express' );
const morgan = require( 'morgan' );
const cors = require( 'cors' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );

const app = express();
app.use( morgan( 'dev' ) );
app.use( cors() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

app.get( '/', ( req, res ) => {
    res.json({
        message: 'Welcome to our application'
    })
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>  {
    console.log( `SERVER is running on port ${PORT}` );
    mongoose.connect( 'mongodb://localhost/transaction-management', { useNewUrlParser: true },  () => {
        console.log( 'database connected' );
    } )
})