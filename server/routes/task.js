const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { getAllTasks, postTask } = require('../controllers/task');

router.route('/:listId').get(protect, getAllTasks);
router.route('/add').post(protect, postTask);

module.exports = router;
