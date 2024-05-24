const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:3XUi07TpM67Z7YZJ@cluster0.bxeatmc.mongodb.net/todos");

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
})

const todo = mongoose.model("todos", todoSchema);

module.exports = {
    todo
}