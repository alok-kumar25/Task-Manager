const express = require('express');
const router = express.Router();
const { addTask,getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth')


router.post('/add', authMiddleware, addTask);
router.get('', authMiddleware, getTasks);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);


module.exports = router;
