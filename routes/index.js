var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' });
});


router.get('/index', function(req, res, next) {
  res.render('index', { title: 'index' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'about' });
});
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'contact' });
});
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'projects' });
}); 
router.get('/thankyou', function(req, res, next) {
  res.render('thankyou', { title: 'thankyou' });
}); 
router.get('/newassignment', function(req, res, next) {
  res.render('newassignment', { title: 'newassignment' });
}); 




module.exports = router;
