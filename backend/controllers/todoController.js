const TodoModel = require('../models/todoModel');
const logger = require('../utils/logger');

async function getAllTodos(req, res, next) {
  try {
    const todos = await TodoModel.findAllByUser(req.user.id);
    res.json({ todos });
  } catch (err) {
    next(err);
  }
}

async function createTodo(req, res, next) {
  try {
    const todo = await TodoModel.create(req.user.id, req.body);
    logger.info(`Todo created (id ${todo.id}) by user ${req.user.id}`);
    res.status(201).json({ todo });
  } catch (err) {
    next(err);
  }
}

async function updateTodo(req, res, next) {
  try {
    const existing = await TodoModel.findByIdAndUser(req.params.id, req.user.id);
    if (!existing) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const updated = await TodoModel.update(req.params.id, req.user.id, req.body);
    res.json({ todo: updated });
  } catch (err) {
    next(err);
  }
}

async function deleteTodo(req, res, next) {
  try {
    const deleted = await TodoModel.delete(req.params.id, req.user.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    logger.info(`Todo deleted (id ${req.params.id}) by user ${req.user.id}`);
    res.json({ message: 'Todo deleted', id: deleted.id });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllTodos, createTodo, updateTodo, deleteTodo };