const express = require( 'express' );
const morgan = require( 'morgan' );
const cors = require( 'cors' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const userRouter = require( './routes/userRouter' );

const app = express();
app.use( morgan( 'dev' ) );
app.use( cors() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

app.use( '/api/user', userRouter );

app.get( '/', ( req, res ) => {
    res.json({
        message: 'Welcome to the application'
    })
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>  {
    console.log( `SERVER is running on port ${PORT}` );
    mongoose.connect( 'mongodb://127.0.0.1/expense-tracker', { useNewUrlParser: true },  () => {
        console.log( 'database connected' );
    } )
})