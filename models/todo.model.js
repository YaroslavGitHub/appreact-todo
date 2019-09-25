const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  todoname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;