// DECLARATION
const express = require('express');
const expressLayouts =require('express-ejs-layouts');
const moment = require('moment');

const router = express.Router();

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

// MODELS
const SubscribeModel = require.main.require('./models/subscriber');
const TransactionModel = require.main.require('./models/transaction');

// ROUTES
router.all('*', (request, response, next) => {
	if(request.session.type == null)
	{
		request.flash('fail', 'You need to login first !', '/');
	}
	else
	{
		next();
	}
});
router.get('/', (request, response, next) => {
  SubscribeModel.getbyuser(request.session.loggedId,function(valid){
    TransactionModel.getbyuser(request.session.loggedId,function(list){
      var now = moment(new Date());
      var end = moment(valid.expire_date);
      var d = end.diff(now,'d');
      var diff = moment.localeData().relativeTime(d, false, d == 1 ? 'd' : 'dd');
      var data={
        tranList:list,
        subscription: valid,
        moment: moment,
        expire: diff
      };
			request.session.subscribe=valid.status;
      response.render('user/subscription',data);
    })

  })

});

router.post('/',[

  check('bkash','Invalid or Empty').isNumeric()
], (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.mapped() });
  }else{
  var now = moment(new Date());
  var new_date = moment(now, "YYYY-MM-DD").add(31, 'days');
  var ex=moment(new_date).format("YYYY-MM-DD");
  var now =moment(now).format("YYYY-MM-DD");
  var subs={
    id:request.session.loggedId,
    expire:ex,
  };
  SubscribeModel.subscribe(subs,function(valid){
      if(valid){
        var values={
          id:request.session.loggedId,
          date:now,
          bkash: request.body.bkash
        };
        TransactionModel.insert(values,function(flag){
          if(flag){
						request.session.subscribe="on";
						request.flash('Success', 'successfully sbscribed!', '/subscribe');
          }
          else{
						request.flash('fail', 'Error insertine data', '/subscribe');
          }
        })
      }
      else{
        request.flash('fail', 'Error insertine data', '/subscribe');
      }
  })
}
  });

module.exports = router;
