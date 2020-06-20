const mongoose = require("mongoose");

const categoriesSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  slug: {
    type: String,
    trim: true,
    unique: 1,
  },
  description: {
    type: String,
  },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
  level: {
    type: Number,
    default: 0,
  },
});

const Category = mongoose.model("Categories", categoriesSchema);

module.exports = { Category };
