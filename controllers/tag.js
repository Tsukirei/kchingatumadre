const TagModel = require("../models/tag");

exports.getAllTag = async (req, res, next) => {
  try {
    let tags = await TagModel.find({});
    res.send({
      count: tags.length,
      tags: tags,
    });
  } catch (err) {
    next(err);
  }
};

exports.getTag = async (req, res, next) => {
  try {
    let id = req.params.idTag;
    let tag = await TagModel.findOne({ idTag: id });
    if (!tag) {
      return res.status(404).send({
        message: "tag not found",
      });
    }
    res.send({ tag: tag });
  } catch (err) {
    next(err);
  }
};

exports.createTag = async (req, res, next) => {
  try {
    let { idTag, name, description} = req.body;
    let newTag = await TagModel.create({
      idTag,
      name,
      description,
    });
    res.send({ newTag });
  } catch (err) {
    next(err);
  }
};

exports.updateTag = async (req, res, next) => {
  try {
    // TODO: Requiere validation
    // What user?
    let idTagToUpdate = req.params.idTag
    // New data
    let {  name, description } = req.body; // TODO: Omit email and password, we need create a recovery strategic
    let tag = await TagModel.findOne({ idTag: idTagToUpdate });

    if (!tag)
      return res.status(400).send({
        message: "tag to update not found",
      });

    tag.name = name;
    tag.description = description;

    let updatedTag = await tag.save();

    if (tag == updatedTag) {
      return res.send({
        message: "tag is updated",
        tag: { name, description},
      });
    }
    res.send({
      message: "cannot update the tag",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteTag = async (req, res, next) => {
  try {
    let id = req.params.idTag;
    let { deletedCount } = await TagModel.deleteOne({ id });
    if (deletedCount == 1) {
      return res.send({
        message: "successfully deleted",
      });
    }
    return res.status(400).send({
      message: "cannot delete the tag, maybe is delete before",
    });
  } catch (err) {
    next(err);
  }
};