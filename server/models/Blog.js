const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  votes: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
