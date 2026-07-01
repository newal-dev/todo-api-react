const express = require('express');
const { body } = require('express-validator');
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');
const { handleValidation } = require('../middleware/validationMiddleware');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Every route below requires a valid JWT
router.use(authenticate);

router.get('/', getAllTodos);

router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 255 }),
    body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
    body('due_date').optional({ checkFalsy: true }).isISO8601().withMessage('due_date must be a valid date (YYYY-MM-DD)')
  ],
  handleValidation,
  createTodo
);

router.put(
  '/:id',
  [
    body('title').optional().trim().isLength({ min: 1, max: 255 }),
    body('priority').optional().isIn(['low', 'medium', 'high']),
    body('due_date').optional({ checkFalsy: true }).isISO8601(),
    body('is_done').optional().isBoolean()
  ],
  handleValidation,
  updateTodo
);

router.delete('/:id', deleteTodo);

module.exports = router;