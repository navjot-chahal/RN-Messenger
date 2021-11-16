const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  getAllTasks,
  postTask,
  deleteTask,
  toggleTask,
} = require('../controllers/task');

router.route('/:listId').get(protect, getAllTasks);
router.route('/add').post(protect, postTask);
router.route('/remove').post(protect, deleteTask);
router.route('/toggle').patch(protect, toggleTask);

module.exports = router;
