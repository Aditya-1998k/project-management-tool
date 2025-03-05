const mongoose = require('mongoose');
const Project = require('./Project');

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    status: { type: String, enum: ['Open', 'In Progress', 'Done'], default: 'Open'},
    project: {type: mongoose.Schema.Type.ObjectId, ref: 'Project'},
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: { type: Date, deafult: Date.now},
})

module.exports = mongoose.model('Task', taskSchema)
