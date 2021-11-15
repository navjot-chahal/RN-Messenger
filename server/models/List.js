const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    listName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = List = mongoose.model('List', userSchema);
