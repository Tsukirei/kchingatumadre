const UserModel = require("../models/user");

exports.getAllUsers = async (req, res, next) => {
  try {
    let users = await UserModel.find({}, "-password");
    res.send({
      count: users.length,
      users,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    let username = req.params.username;
    let user = await UserModel.findOne({ username }, "-password");
    if (!user) {
      return res.status(404).send({
        message: "user not found",
      });
    }
    res.send({ user });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    let { id, username, password, tags, idProject, idFav,} = req.body;
    let newUser = await UserModel.create({
      id,
      username,
      password,
      tags,
      idProject,
      idFav,
    });
    n
    res.send({ newUser });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    // TODO: Requiere validation
    // What user?
    let userToUpdate = req.params.username;
    // New data
    let { username, password, tags, idProject, idFav } = req.body; // TODO: Omit email and password, we need create a recovery strategic
    let user = await UserModel.findOne({ username: userToUpdate });

    if (!user)
      return res.status(400).send({
        message: "User to update not found",
      });

    user.username = username;
    user.tags = tags;
    user.password = password;
    user.idProject = idProject;
    user.idFav = idFav;


    let updatedUser = await user.save();

    if (user == updatedUser) {
      return res.send({
        message: "User is updated",
        user: { username, email: user.email},
      });
    }
    res.send({
      message: "cannot update the user",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    let username = req.params.username;
    let { deletedCount } = await UserModel.deleteOne({username: username });
    if (deletedCount == 1) {
      return res.send({
        message: "successfully deleted",
      });
    }
    return res.status(400).send({
      message: "cannot delete the user, maybe is delete before",
    });
  } catch (err) {
    next(err);
  }
};