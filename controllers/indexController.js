// DECLARATION
const express = require('express');
const router = express.Router();

// ROUTER
router.get('/', function(request, response){
	response.render('index');
});

module.exports = router;
