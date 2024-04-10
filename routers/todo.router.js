const router = require('express').Router();
const TodoController = require('../controller/todo.controller');

router.post('/createtodo',TodoController.createTodo);

module.exports = router;