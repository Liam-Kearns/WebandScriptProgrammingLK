const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignment_db');

// Read operation 
router.get('/', async (req, res, next) => {
  try {
    const assignList = await Assignment.find().exec();
    console.log(assignList); 
    res.render('assignments', { assignList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// render a form to add a new assignment
router.get('/new', (req, res) => {
  res.render('newAssignment');
});

// handle the form submission to add a new assignment
router.post('/new', async (req, res) => {
  try {
    const newAssignment = new Assignment(req.body);
    await newAssignment.save();
    res.redirect('/assignments');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// render a form to edit an existing assignment
router.get('/edit/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id).exec();
    res.render('editassignment', { assignment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// handle the form submission to edit an existing assignment
router.post('/edit/:id', async (req, res) => {
  try {
    await Assignment.findByIdAndUpdate(req.params.id, req.body).exec();
    res.redirect('/assignments');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete operation 
router.get('/delete/:id', async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id).exec();
    res.redirect('/assignments');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Render editAssignment.ejs 
router.get(['/editassignment/:id', '/editassignment'], async (req, res) => {
  console.log('Reached /editassignment/:id route');
  if (req.params.id) {
    try {
      const assignment = await Assignment.findById(req.params.id).exec();
      if (!assignment) {
        res.status(404).send('Assignment not found');
        return;
      }
      res.render('editassignment', { assignment });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Render the editassignment.ejs for static route
    res.render('editassignment', { title: 'editassignment' });
  }
});

module.exports = router;
