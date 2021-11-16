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

// @route POST /task/remove
// @desc Deletes an exsiting task for a user
// @access Private
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const { taskId } = req.body;

  const task = await Task.findById(taskId);

  if (!task) {
    res.status(400).json({ error: { message: 'Task not found!' } });
    return;
  }

  await Task.deleteOne({ _id: taskId });

  res.status(200).json({
    success: true,
  });
});

// @route PATCH /task/toggle
// @desc Update the completed tag of previous task
// @access Private
exports.toggleTask = asyncHandler(async (req, res, next) => {
  const { taskId } = req.body;

  const task = await Task.findById(taskId);

  if (!task) {
    res.status(400).json({ error: { message: 'Task not found!' } });
    return;
  }

  task.completed = !task.completed;

  await task.save();

  res.status(200).json({
    success: { task },
  });
});
