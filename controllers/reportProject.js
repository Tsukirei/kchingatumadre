const reportProjectModel = require("../models/reportProject");

exports.getAllReportProject = async (req, res, next) => {
  try {
    let reportProject = await reportProjectModel.find({});
    res.send({
      count: reportProject.length,
      reportProject: reportProject,
    });
  } catch (err) {
    next(err);
  }
};

exports.getReportProject = async (req, res, next) => {
  try {
    let id = req.params.idReport;
    let reportProject = await reportProjectModel.findOne({ idReport: id });
    if (!reportProject) {
      return res.status(404).send({
        message: "report not found",
      });
    }
    res.send({ comment: reportProject });
  } catch (err) {
    next(err);
  }
};

exports.createReportProject = async (req, res, next) => {
  try {
    let { idReport, description ,idProject} = req.body;
    let NewReportProject = await reportProjectModel.create({
      idReport,
      description,
      idProject,
    });
    res.send({ newReport: NewReportProject });
  } catch (err) {
    next(err);
  }
};

exports.updateReportProject = async (req, res, next) => {
  try {
    // TODO: Requiere validation
    // What user?
    let reportToUpdate = req.params.idReport;
    // New data
    let { idReport, description, idProject } = req.body; // TODO: Omit email and password, we need create a recovery strategic
    let report = await reportProjectModel.findOne({ idReport: reportToUpdate });

    if (!report)
      return res.status(400).send({
        message: "ReportComment to update not found",
      });

   report.idReport = idReport;
   report.description =  description;
   report.idProject = idProject;

    let updatedReport = await report.save();

    if (report == updatedReport) {
      return res.send({
        message: "ReportProject is updated",
        Report: { idReport, description, idProject},
      });
    }
    res.send({
      message: "cannot update the ReportComment",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteReportProject = async (req, res, next) => {
  try {
    let id = req.params.idReport;
    let { deletedCount } = await reportProjectModel.deleteOne({ idReport: id });
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