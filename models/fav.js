const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const FavSchema = new Schema(
  {
    idUser: {
      type: String,
      required: true,
      unique: true,
    },
    idProject: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TagModel = mongoose.model("fav", FavSchema);

module.exports = TagModel;