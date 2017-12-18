// DECLARATION
const express = require('express');
const router = express.Router();

// ROUTES
router.get('/', (request, response, next) => {
	response.render('user/subscription');
});

module.exports = router;
