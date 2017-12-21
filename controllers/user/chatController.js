// DECLARATION
const express = require('express');
const router = express.Router();

// MODELS


// ROUTES
router.get('/', (request, response, next) => {
	response.render('user/chatting/party/chat');
});



module.exports = router;
