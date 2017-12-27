// DECLARATION
const express = require('express');
const moment = require('moment');
const router = express.Router();


const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

//models
const movieModel = require.main.require('./models/movies');

// ROUTES
// File upload testing
// https://www.npmjs.com/package/express-fileupload
router.get('/', (request, response, next) => {
	if(request.session.type != 1)
	{
		request.flash('fail', 'only admin can access', '/');
	}
	else
	{
		next();
	}
});


router.get('/', function(req, res) {
  res.render('admin/upload');
});
router.post('/',[

  check('title', 'title field cannot be empty.').exists(),
  check('director', 'director field cannot be empty.').exists(),
  check('cast', 'cast field cannot be empty.').exists(),
  check('plot', 'plot field cannot be empty.').exists()

], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }else{

    //console.log((req.body.genre != null) ? JSON.stringify(req.body.genre) : 'nothing');

    var new_movie = {
      title: req.body.title,
      director: req.body.director,
      cast: req.body.cast,
      plot:req.body.plot,
			genre: (req.body.genre != null) ? JSON.stringify(req.body.genre) : '',
      date:req.body.date
    };
    movieModel.insertGetid(new_movie,function(valid){
      if(valid>0){
        if (!req.files)
          return res.status(400).send('No files were uploaded.');

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.sampleFile;
        let sampleFile2 = req.files.sampleFile2;

        if(sampleFile.mimetype=="image/jpeg" && sampleFile2.mimetype=="video/mp4"){
	        sampleFile.mv('./public/poster/' + valid+'.jpg', function(err) {
	          if (err)
	            return res.status(500).send(err);

	            sampleFile2.mv('./public/movies/' + valid+'.mp4', function(err) {
	              if (err)
	                return res.status(500).send(err);

	              req.flash('success','File uploaded!','/admin');
	            });
	        });

      	}
        else{
          req.flash('fail','Wrong type of file!','/admin');
        }
      }
      else
      {
        req.flash('fail', 'Error Occured !', '/');
      }

    })

  }
});

module.exports = router;
