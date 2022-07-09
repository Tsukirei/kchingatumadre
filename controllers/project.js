const ProjectModel = require("../models/project");

exports.getAllProject = async (req, res, next) => {
  try {
    let project = await ProjectModel.find({});
    res.send({
      count: project.length,
      project,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProject = async (req, res, next) => {
  try {
    let id = req.params.id;
    let project = await ProjectModel.findOne({ id: id });
    if (!project) {
      return res.status(404).send({
        message: "project not found",
      });
    }
    res.send({ project });
  } catch (err) {
    next(err);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    let { id, idUser, name, price, description, idComment,} = req.body;
    let newProject = await ProjectModel.create({
      id,
      idUser,
      name,
      price,
      description,
      idComment,
    });
    res.send({ newProject });
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    // TODO: Requiere validation
    // What user?
    let projectToUpdate = req.params.id;
    // New data
    let { id, idUser, name, price, description, idComment, } = req.body; // TODO: Omit email and password, we need create a recovery strategic
    let project = await ProjectModel.findOne({ id: projectToUpdate });

    if (!project)
      return res.status(400).send({
        message: "project to update not found",
      });

     project.id= id;
     project.name = id;
     project.price= price;
     project.idUser = idUser;
     project.description = description;
     project.idComment = idComment;


    let updatedProject = await project.save();

    if (project == updatedProject) {
      return res.send({
        message: "project is updated",
        project: { id, idUser, name, price, description, idComment},
      });
    }
    res.send({
      message: "cannot update the project",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProject= async (req, res, next) => {
  try {
    let id = req.params.id;
    let { deletedCount } = await ProjectModel.deleteOne({ id: id });
    if (deletedCount == 1) {
      return res.send({
        message: "successfully deleted",
      });
    }
    return res.status(400).send({
      message: "cannot delete the project, maybe is delete before",
    });
  } catch (err) {
    next(err);
  }
};