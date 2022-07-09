const FavModel = require("../models/fav");

exports.getAllFav = async (req, res, next) => {
  try {
    let id = req.params.id
    let fav = await FavModel.find({});
    res.send({
      count: fav.length,
      Favorite: fav,
    });
  } catch (err) {
    next(err);
  }
};

exports.getFav = async (req, res, next) => {
  try {
    let id = req.params.idTag;
    let Favorite = await FavModel.findOne({ username: id });
    if (!Favorite) {
      return res.status(404).send({
        message: "favorite not found",
      });
    }
    res.send({ comment: Favorite });
  } catch (err) {
    next(err);
  }
};

exports.createFav = async (req, res, next) => {
  try {
    let { idUser, idProject} = req.body;
    let NewFav = await FavModel.create({
      idUser,
      idProject,
    });
    res.send({ newTag: NewFav });
  } catch (err) {
    next(err);
  }
};

exports.updateFav = async (req, res, next) => {
  try {
    // TODO: Requiere validation
    // What user?
    let usernameToUpdate = req.params.username;
    // New data
    let { username, name, lastName } = req.body; // TODO: Omit email and password, we need create a recovery strategic
    let user = await FavModel.findOne({ username: usernameToUpdate });

    if (!user)
      return res.status(400).send({
        message: "comment to update not found",
      });

    user.username = username;
    user.name = name;
    user.lastName = lastName;

    let updatedUser = await user.save();

    if (user == updatedUser) {
      return res.send({
        message: "tag is updated",
        user: { username, name, lastName, email: user.email},
      });
    }
    res.send({
      message: "cannot update the tag",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteFav = async (req, res, next) => {
  try {
    let id = req.params.idTag;
    let { deletedCount } = await FavModel.deleteOne({ id });
    if (deletedCount == 1) {
      return res.send({
        message: "successfully deleted",
      });
    }
    return res.status(400).send({
      message: "cannot delete the favorite, maybe is delete before",
    });
  } catch (err) {
    next(err);
  }
};