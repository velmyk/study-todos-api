const mongoose = require('mongoose');
const shortid = require('shortid');

const todoSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true, default: shortid.generate },
        text: { type: String, default: '' },
        done: { type: Boolean, default: false },
    },
    { collection: 'todos' },
);

module.exports = mongoose.model('Todos', todoSchema);
