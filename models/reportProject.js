const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const reportProjectSchema = new Schema(
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
    idProject: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

const TagModel = mongoose.model("reportProject", reportProjectSchema);

module.exports = TagModel;