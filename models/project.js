const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ProjectSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    idUser: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    idComment: [{
      type: String,
      required: false,
    }],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("project", ProjectSchema);

module.exports = UserModel;