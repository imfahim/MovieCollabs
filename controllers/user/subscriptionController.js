// DECLARATION
const express = require('express');
const moment = require('moment');

const router = express.Router();

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

// MODELS
const SubscribeModel = require.main.require('./models/subscriber');
const TransactionModel = require.main.require('./models/transaction');

// ROUTES
router.get('/', (request, response, next) => {
  SubscribeModel.getbyuser(request.session.loggedId,function(valid){
    TransactionModel.getbyuser(request.session.loggedId,function(list){
      var now = moment(new Date());
      var end = moment(valid.expire_date);
      var d = end.diff(now,'d');
      var diff = moment.langData().relativeTime(d, false, d == 1 ? 'd' : 'dd');
      var data={
        tranList:list,
        subscription: valid,
        moment: moment,
        expire: diff
      };
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
  console.log(ex);
  SubscribeModel.subscribe(subs,function(valid){
      if(valid){
        var values={
          id:request.session.loggedId,
          date:now,
          bkash: request.body.bkash
        };
        TransactionModel.insert(values,function(flag){
          if(flag){
            response.redirect('/subscribe')
          }
          else{
            response.send('Error insertine data')
          }
        })
      }
      else{
        response.send('Error insertine data')
      }
  })
}
  });

module.exports = router;
