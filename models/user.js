const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    idProject: [{
      type: String,
      ref: "project",
      required: false,
    }],
    idFav: [{
      type: String,
      ref: "project",
      required: false,
    }],
  },
  { timestamps: true }
);

// Always encrypt the password before save
UserSchema.pre("save", async function (next) {
  const user = this;
  // Auto-generate Salt, and 10 salt rounds
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

// Helper method to validate password
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;