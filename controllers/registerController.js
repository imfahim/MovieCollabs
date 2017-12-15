// DECLARATION
const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
var bcrypt = require('bcrypt');
const saltRounds = 10;

// MODELS
const userModel = require.main.require('./models/user');

// ROUTERS
router.get('/', (request, response, next) => {
	response.render('auth/register');
});

router.post('/', [

  check('username', 'Username field cannot be empty.').exists(),
  check('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i'),
  check('username', 'Username must be between 4-15 characters long.').isLength(4, 15),
  check('email', 'The email you entered is invalid, please try again.').isEmail(),
  check('email', 'Email address must be between 4-100 characters long, please try again.').isLength(4, 100),
  check('password', 'Password must be between 8-100 characters long.').isLength(8, 100)
  //check("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
  /*check('password_match', 'Password must be between 8-100 characters long.')
    .exists()
    .custom((value, { request }) => value === request.body.password)*/

], (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.mapped() });
  }else{

    bcrypt.hash(request.body.password, saltRounds, function(err, hash) {
      var new_user = {
    		username: request.body.username,
    		password: hash,
        email: request.body.email
    	};

      userModel.insert(new_user, function(valid){
    		if(valid)
    		{
          request.flash('success', 'Successfully Registered !', '/register');
    		}
    		else
    		{
          request.flash('fail', 'Error Occured !', '/register');
    		}
    	});
    });
  }
});

module.exports = router;
