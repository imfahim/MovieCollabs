// DECLARATION
const express = require('express');
const router = express.Router();

// ROUTES
router.get('/', (request, response, next) => {
	if(request.session.loggedUsername == null)
	{
		request.flash('fail', 'You need to login first !', '/');
	}else if (request.session.type === 0) {
    request.flash('fail', 'You need to login first as admin !', '/');
  }
  next();
});

router.get('/', (request, response, next) => {
	response.render('admin/movies/index', {
    title: 'Admin Panel - Movies Management',
    layout: 'admin/layout'
  });
});

module.exports = router;
