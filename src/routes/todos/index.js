const routerConstructor = require('express').Router;
const controller = require('./todos.controller');

const router = routerConstructor();

router
    .post('', controller.addTodo)
    .get('', controller.getTodosList)
    .get('/:id', controller.getTodoById)
    .delete('/:id', controller.removeTodo)
    .put('/:id', controller.updateTodo);

module.exports = router;
