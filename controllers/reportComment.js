const reportCommentModel = require("../models/reportComment");

exports.getAllReportComment = async (req, res, next) => {
  try {
    let reportComment = await reportCommentModel.find({});
    res.send({
      count: reportComment.length,
      reportComment: reportComment,
    });
  } catch (err) {
    next(err);
  }
};

exports.getReportComment = async (req, res, next) => {
  try {
    let id = req.params.idReport;
    let reportComment = await reportCommentModel.findOne({ idReport: id });
    if (!reportComment) {
      return res.status(404).send({
        message: "report not found",
      });
    }
    res.send({ comment: reportComment });
  } catch (err) {
    next(err);
  }
};

exports.createReportComment = async (req, res, next) => {
  try {
    let { idReport, description ,idComment} = req.body;
    let NewReportComment = await reportCommentModel.create({
      idReport,
      description,
      idComment,
    });
    res.send({ NewReportComment });
  } catch (err) {
    next(err);
  }
};

exports.updateReportComment = async (req, res, next) => {
  try {
    // TODO: Requiere validation
    // What user?
    let reportCommentToUpdate = req.params.idReport;
    // New data
    let { idReport, description, idComment } = req.body; // TODO: Omit email and password, we need create a recovery strategic
    let reportComment = await reportCommentModel.findOne({idReport: reportCommentToUpdate });

    if (!reportComment)
      return res.status(400).send({
        message: "Report to update not found",
      });

   reportComment.idReport= idReport;
   reportComment.description = description;
   reportComment.idComment = idComment;
    let updatedReportComment = await reportComment.save();

    if (reportComment == updatedReportComment) {
      return res.send({
        message: "ReportComment is updated",
        reportComment: { idReport, description, idComment},
      });
    }
    res.send({
      message: "cannot update the Report",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteReportComment = async (req, res, next) => {
  try {
    let id = req.params.idReport;
    let { deletedCount } = await reportCommentModel.deleteOne({ id });
    if (deletedCount == 1) {
      return res.send({
        message: "successfully deleted",
      });
    }
    return res.status(400).send({
      message: "cannot delete the report, maybe is delete before",
    });
  } catch (err) {
    next(err);
  }
};