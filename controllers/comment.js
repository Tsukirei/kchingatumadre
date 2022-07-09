const CommentModel = require("../models/comment");

exports.getAllComment = async (req, res, next) => {
  try {
    let comment = await CommentModel.find({});
    res.send({
      count: comment.length,
      Comment: comment,
    });
  } catch (err) {
    next(err);
  }
};

exports.getComment = async (req, res, next) => {
  try {
    let id = req.params.idComment;
    let comment = await CommentModel.findOne({ idComment: id });
    if (!comment) {
      return res.status(404).send({
        message: "comment not found",
      });
    }
    res.send({ comment });
  } catch (err) {
    next(err);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    let { idComment, idUser, comment} = req.body;
    let NewComment = await CommentModel.create({
      idComment,
      idUser,
      comment,
    });
    res.send({ newTag: NewComment });
  } catch (err) {
    next(err);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    // TODO: Requiere validation
    // What user?
    let commentToUpdate = req.params.idComment;
    // New data
    let { idComment, idUser, comment } = req.body; // TODO: Omit email and password, we need create a recovery strategic
    let commentary = await CommentModel.findOne({ idComment: commentToUpdate });

    if (!commentary)
      return res.status(400).send({
        message: "comment to update not found",
      });

     commentary.idComment= idComment;
     commentary.idUser = idUser;
     commentary.comment = comment;
    

    let updateComment = await commentary.save();

    if (commentary == updateComment) {
      return res.send({
        message: "tag is updated",
        commentary:{ idComment, idUser, comment }});
    }
    res.send({
      message: "cannot update the tag",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    let id = req.params.idComment;
    let { deletedCount } = await CommentModel.deleteOne({ id });
    if (deletedCount == 1) {
      return res.send({
        message: "successfully deleted",
      });
    }
    return res.status(400).send({
      message: "cannot delete the comment, maybe is delete before",
    });
  } catch (err) {
    next(err);
  }
};