const Task = require('../models/Task');
const asyncHandler = require('express-async-handler');

// @route GET /task/:listId
// @desc Get all lists for the user
// @access Private
exports.getAllTasks = asyncHandler(async (req, res, next) => {
  const { listId } = req.params;
  const taskArr = await Task.find({ listId });

  res.status(200).json({
    success: {
      tasks: taskArr,
    },
  });
});

// @route POST /task/add
// @desc Add a new list for the user
// @access Private
exports.postTask = asyncHandler(async (req, res, next) => {
  const { listId, taskName } = req.body;

  if (!listId || !taskName) {
    res
      .status(400)
      .json({ error: { message: 'List Id and task name must be provided' } });
    return;
  }

  const task = await Task.create({
    listId,
    taskName,
  });

  res.status(200).json({
    success: {
      newTask: task,
    },
  });
});
