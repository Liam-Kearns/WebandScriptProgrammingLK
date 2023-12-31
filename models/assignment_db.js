const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    Id:String,
    name: String,
    class: String,
    due_date: String,
    group: String,
    lines: Number,
    completed: String
}, {
    collection: 'Assignment_db'
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;