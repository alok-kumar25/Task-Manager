const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,  
        minlength: 3,    
        maxlength: 100,  
    },
    description: {
        type: String,
        required: true, 
        minlength: 5,    
    },
    dueDate: {
        type: Date,      
        required: true,  
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'], 
        default: 'medium',
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
    updatedAt: {
        type: Date,
        default: Date.now, 
    }
});

taskSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
