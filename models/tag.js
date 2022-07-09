const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TagSchema = new Schema(
  {
    idTag: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TagModel = mongoose.model("tags", TagSchema);

module.exports = TagModel;