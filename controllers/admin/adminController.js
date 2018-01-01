// DECLARATION
const express = require('express');
const moment = require('moment');
const router = express.Router();
const fs = require('fs');

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

//models
const movieModel = require.main.require('./models/movies');
const likeModel = require.main.require('./models/like');
const coversModel = require.main.require('./models/covers');
const usersModel = require.main.require('./models/user');


// ROUTES
// File upload testing
// https://www.npmjs.com/package/express-fileupload
router.all('*', (request, response, next) => {
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
  res.render('admin/nav');
});
router.get('/charts', function(req, res) {
	movieModel.getMovies((result) => {
		coversModel.getAll((all)=>{
  res.render('admin/charts', { movies : result ,moment:moment,covers:all});
		});
	});
});

router.get('/upload', function(req, res) {
  res.render('admin/upload');
});
router.get('/user-management', function(req, res) {
	usersModel.getAll((result)=>{
	  res.render('admin/user-management',{users:result});
	});
});
router.get('/cover/remove/:id',function(req,res){
		var movie_id= req.params.id;
		coversModel.remove(movie_id,(flag)=>{
			if(flag){
				fs.unlink('./public/covers/'+movie_id+'.jpg',function(error){
					if(error){
						req.flash('fail',error,'/admin/charts');
					}
					else{
						req.flash('success','Succesfully removed!','/admin/charts');
					}
				});
			}
			else{
				req.flash('fail','Error','/admin/charts');
			}
		})
});
router.post('/charts',function(req,res){
	var check=true;
	coversModel.getAll((result)=>{
		for(var i=0;i<result.length;i++){
			if(result[i].movie_id==req.body.movie_id){
				check=false;
			}
		}
		if(check && result.length!=5){
			coversModel.insert(req.body.movie_id,(flag)=>{
				if(flag){
					if (!req.files)
						return res.status(400).send('No files were uploaded.');

					// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
					let sampleFile = req.files.sampleFile;

					if(sampleFile.mimetype=="image/jpeg"){
						sampleFile.mv('./public/covers/' + req.body.movie_id+'.jpg', function(err) {
							if (err)
								return res.status(500).send(err);
									req.flash('success','Succesful!','/admin/charts');
								});
					}
					else{
						req.flash('fail','Wrong type of file!','/admin/charts');
					}

				}
			});
		}
		else{
			req.flash('fail','Already Exist or Limit Reached!','/admin/charts');
		}
	});

});

router.post('/upload',[

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

			              req.flash('success','File uploaded!','/admin/upload');
			            });
			        });

		      	}
		        else{
		          req.flash('fail','Wrong type of file!','/admin/upload');
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
