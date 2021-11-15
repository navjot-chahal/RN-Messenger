const List = require('../models/List');
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

// @route POST /users/isSitter/
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
