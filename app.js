// DECLARATION
const express = require('express');
const bodyParser = require('body-parser');
const flash = require('express-flash-notification');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressLayouts =require('express-ejs-layouts');
const moment =require('moment');


const app = express();

// Requirements
require('dotenv').config();

// Controllers Declarations
const index = require('./controllers/indexController');
const register = require('./controllers/registerController');
const login = require('./controllers/loginController');
const userManager = require('./controllers/user/indexController');
const subscription = require('./controllers/user/subscriptionController');

// CONFIGURATION
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout','layout');


// MIDDLEWARES

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static('public'));
app.use(session({
  secret: '2446B86ACE2FA6A57D95172AB2B66',
  saveUninitialized: false,
  resave: false
}));

app.use(flash(app));

// ROUTES
app.use('/', index);
app.use('/register', register);
app.use('/login', login);

// For Users
app.use('/home', userManager);
app.use('/subscribe', subscription);


// SERVER
app.listen(3000, function(){
	console.log('server started ...');
});
