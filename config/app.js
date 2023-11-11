const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('./mongoose'); // Import the mongoose.js file
const Assignment = require('../models/assignment_db'); // Import the assignment model

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

//directing routes
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
const assignmentsRouter = require('../routes/assignment');

// What routers can use
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/assignments', assignmentsRouter);

app.get('/editassignment/:id', async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.id).exec();
    if (!assignment) {
      res.status(404).send('Assignment not found');
      return;
    }
    res.render('editassignment', { assignment });
  } catch (err) {
    console.error('Error in /editassignment/:id route:', err);
    next(err); 
  }
});
// Route to handle updating assignments
app.post('/editassignment/:id', async (req, res, next) => {
  try {
    // Find the assignment by ID
    const assignment = await Assignment.findById(req.params.id);
    // Update assignment properties based on the form data
    assignment.name = req.body.name;
    assignment.class = req.body.class;
    assignment.due_date = req.body.due_date;
    assignment.group = req.body.group;
    assignment.lines = req.body.lines;
    assignment.completed = req.body.completed;
    // Save the updated assignment
    await assignment.save();
    // Redirect to the assignments page
    res.redirect('/assignments');
  } catch (error) {
    console.error(error);
    next(createError(500));
  }
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
