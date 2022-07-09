const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CommentSchema = new Schema(
  {
    idComment: {
      type: String,
      required: true,
      unique: true,
    },
    idUser: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TagModel = mongoose.model("comment", CommentSchema);

module.exports = TagModel;