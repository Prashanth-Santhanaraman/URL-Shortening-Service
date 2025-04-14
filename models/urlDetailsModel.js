const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  shortcode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  accessCount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("shortUrl",urlSchema)
