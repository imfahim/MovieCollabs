// DECLARATION
const express = require('express');
const moment = require('moment');
const router = express.Router();

// MODELS
const moviesModel = require.main.require('./models/movies');
const coversModel = require.main.require('./models/covers');
const SubscribeModel = require.main.require('./models/subscriber');
const buddyModel = require.main.require('./models/buddy_lists');
const userdetailsModel = require.main.require('./models/userdetails');




function sortProperties(obj, sortedBy, isNumericSort, reverse) {
  sortedBy = sortedBy || 1; // by default first key
  isNumericSort = isNumericSort || false; // by default text sort
  reverse = reverse || false; // by default no reverse

  var reversed = (reverse) ? -1 : 1;

  var sortable = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      sortable.push([key, obj[key]]);
    }
  }
  if (isNumericSort)
    sortable.sort(function(a, b) {
      return reversed * (a[1][sortedBy] - b[1][sortedBy]);
    });
  else
    sortable.sort(function(a, b) {
      var x = a[1][sortedBy].toLowerCase(),
        y = b[1][sortedBy].toLowerCase();
      return x < y ? reversed * -1 : x > y ? reversed : 0;
    });
  return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}



// ROUTES
router.get('/', (request, response, next) => {
  if (request.session.loggedUsername == null) {
    request.flash('fail', 'You need to login first !', '/');
  } else {
    next();
  }
});

router.get('/', (request, response, next) => {
  moviesModel.getMovies((result) => {
    moviesModel.getTopchart((charts) => {
      coversModel.getAll((covers) => {
        SubscribeModel.getbyuser(request.session.loggedId, (flag) => {
          if (flag.status == "on") {
            request.session.subscribe = "on";
          } else {
            request.session.subscribe = null;
          }
          userdetailsModel.getUserDetailsById(request.session.loggedId, (details) => {
            if(!details.fav_genre){
              var demoRes=null;
            }
            else{
            var demoPro = JSON.parse(details.fav_genre);
            console.log(demoPro);
            var demoRes = result;
            for (var i = 0; i < demoRes.length; i++) {
              demoRes[i].count = 0;
              var genre = JSON.parse(demoRes[i].genre);
              for (var j = 0; j < genre.length; j++) {
                for (var k = 0; k < demoPro.length; k++) {
                  if (demoPro[k] == genre[j]) {
                    demoRes[i].count++;
                  }
                }
              }
            }
            demoRes = sortProperties(demoRes, 'count', true, true);}
            response.render('user/index', {
              movies: result,
              top_chart: charts,
              covers: covers,
              moment: moment,
              suggestions: demoRes
            });

          });

        });

      });
    });

  });

});

router.get('/api/movies/list', (request, response, next) => {
  moviesModel.getMovies((result) => {
    //response.render('user/index', { movies : result });
    response.writeHead(200, {
      'content-type': 'application/json'
    });
    response.end(JSON.stringify(result, null, 3));
  });

});

module.exports = router;
