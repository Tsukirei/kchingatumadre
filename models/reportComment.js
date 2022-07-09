const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const reportCommentSchema = new Schema(
  {
    idReport: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    idComment: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

const TagModel = mongoose.model("reportComment", reportCommentSchema);

module.exports = TagModel;