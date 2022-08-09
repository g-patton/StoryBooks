const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session')
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db')

const PORT = process.env.PORT || 3000;

//load config
dotenv.config({ path: './config/config.env' });

// passport config 
require('./config/passport')(passport);

connectDB();

const app = express();

//logging in 
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// handlebars
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', '.hbs')


//sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
    //   store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
    })
  )

// passport middleware
app.use(passport.initialize())
app.use(passport.session())


//static folder
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', require('./routes/index'))


app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );
//




