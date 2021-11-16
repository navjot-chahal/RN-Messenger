const List = require('../models/List');
const Task = require('../models/Task');
const asyncHandler = require('express-async-handler');

// @route GET /list/getAll
// @desc Get all lists for the user
// @access Private
exports.getAllLists = asyncHandler(async (req, res, next) => {
  const listArr = await List.find({ user: req.user.id });

  res.status(200).json({
    success: {
      lists: listArr,
    },
  });
});

// @route POST /list/add
// @desc Add a new list for the user
// @access Private
exports.postList = asyncHandler(async (req, res, next) => {
  const id = req.user.id;
  const { listName } = req.body;

  if (!listName) {
    res
      .status(400)
      .json({ error: { message: 'Name for list must be provided' } });
    return;
  }

  const list = await List.create({
    user: id,
    listName,
  });

  res.status(200).json({
    success: {
      newList: list,
    },
  });
});

// @route POST /list/remove
// @desc Remove an existing list and all of its tasks.
// @access Private
exports.deleteList = asyncHandler(async (req, res, next) => {
  const { listId } = req.body;

  if (!listId) {
    res
      .status(400)
      .json({ error: { message: 'Name for list must be provided' } });
    return;
  }

  await List.deleteOne({ _id: listId });
  await Task.deleteMany({ listId });

  res.status(200).json({
    success: true,
  });
});
