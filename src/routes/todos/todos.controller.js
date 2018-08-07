const TodoModel = require('./todos.model');
const _pick = require('lodash/pick');

const addTodo = (req, res, next) => {
    const { text, done } = req.body;
    return TodoModel.create({ text, done })
        .then(todo => res.json({ success: true, todo: _pick(todo, ['id', 'text', 'done']) }))
        .catch(next);
};

const updateTodo = (req, res, next) => {
    const { body, params: { id } } = req;
    const { text, done } = body;
    TodoModel.update({ id }, { $set: { text, done } })
        .then(() => TodoModel.findOne({ id }).select('id text done -_id'))
        .then(todo => res.json({ success: true, todo }))
        .catch(next);
};

const removeTodo = (req, res, next) =>
    TodoModel.findOne({ id: req.params.id })
        .then(todo => todo.remove())
        .then(() => res.json({ success: true }))
        .catch(next);

const getTodosList = (req, res, next) =>
    TodoModel.find()
        .select('id text done -_id')
        .then(todos => res.status(200).json({ success: true, todos }))
        .catch(next);

const getTodoById = (req, res, next) =>
    TodoModel.findOne({ id: req.params.id })
        .select('id text done -_id')
        .then(todo => todo ? res.send({ success: true, todo }) : res.status(404).json({ success: false, message: 'Not Found' }))
        .catch(next);

module.exports = {
    addTodo,
    removeTodo,
    updateTodo,
    getTodosList,
    getTodoById,
};
