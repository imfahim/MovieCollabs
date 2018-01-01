// DECLARATION
const express = require('express');
const router = express.Router();

const buddyModel = require.main.require('./models/buddy_lists');

// ROUTES
router.all('*', (request, response, next) => {
	if(request.session.loggedUsername == null)
	{
		request.flash('fail', 'You need to login first !', '/');
	}
	else
	{
		next();
	}
});

router.post('/',(request,response)=>{
  var user_id=request.body.user_id;
  if(request.session.subscribe!="on"){
    request.flash('fail', 'Need subscription to proceed !', '/profile/profileOf/'+user_id);
  }
  else{
  var data={
    myid:request.session.loggedId,
    user_id:user_id,
  };
  buddyModel.insert(data,(flag)=>{
    if(flag){
      request.flash('Success', 'Request Sent Successfully!', '/profile/profileOf/'+user_id);
    }
    else{
      request.flash('fail', 'Request Sent Failed!', '/profile/profileOf/'+user_id);
    }
  });
}
});
router.post('/cancel',(request,response)=>{
  var user_id=request.body.user_id;
  if(request.session.subscribe!="on"){
    request.flash('fail', 'Need subscription to proceed !', '/profile/profileOf/'+user_id);
  }
  else{
  var buddy_id=request.body.buddy_id;
  buddyModel.cancel(buddy_id,(flag)=>{
    if(flag){
      request.flash('Success', 'Successfully Canceled or Removed!', '/profile/profileOf/'+user_id);
    }
    else{
      request.flash('fail', 'Failed to cancel!', '/profile/profileOf/'+user_id);
    }
  });
}
});
router.post('/accept',(request,response)=>{
  var user_id=request.body.user_id;
  var buddy_id=request.body.buddy_id;
  buddyModel.accpt(buddy_id,(flag)=>{
    if(flag){
      request.flash('Success', 'Successfully accepted!', '/profile/profileOf/'+user_id);
    }
    else{
      request.flash('fail', 'Failed to cancel!', '/profile/profileOf/'+user_id);
    }
  });
});



module.exports = router;
