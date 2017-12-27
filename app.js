// DECLARATION
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('express-flash-notification');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressLayouts =require('express-ejs-layouts');
const moment =require('moment');
const fileUpload = require('express-fileupload');


const app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

// Requirements
require('dotenv').config();

// Controllers Declarations
const index = require('./controllers/indexController');
const register = require('./controllers/registerController');
const login = require('./controllers/loginController');
const userManager = require('./controllers/user/indexController');
const adminManager = require('./controllers/admin/adminController');
const subscription = require('./controllers/user/subscriptionController');
const chatManager = require('./controllers/user/chatController');
const movieManager = require('./controllers/user/movieController');
const profileManager = require('./controllers/user/profileController');

// CONFIGURATION
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout','layout');
app.set("layout extractScripts", true);

//-----------------------------------------------------------------------------
// Configure web sockets.
//-----------------------------------------------------------------------------
io.sockets.on("connection", function(socket) {

    socket.on("send message", function(message) {
        io.sockets.emit("new message", message);
    });

});


// MIDDLEWARES

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use('/public', express.static('public'));
app.use(session({
  secret: '2446B86ACE2FA6A57D95172AB2B66',
  saveUninitialized: false,
  resave: false
}));

app.use(flash(app));
app.use(fileUpload());
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});
// ROUTES
app.use('/', index);
app.use('/register', register);
app.use('/login', login);

// For Users
app.use('/home', userManager);
app.use('/subscribe', subscription);
app.use('/profile', profileManager);
app.use('/movie', movieManager);


// For Admins
app.use('/admin', adminManager);

// Chatting test
app.use('/chat', chatManager);



// --------------------------------------------------------------------------------------------------


// SERVER
server.listen(3000, function(){
	console.log('server started ...');
});
