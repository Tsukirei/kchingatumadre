var {
    getAllReportProject,
    getReportProject,
    createReportProject,
    updateReportProject,
    deleteReportProject,
  } = require("../controllers/reportProject");
  var express = require("express");
  var router = express.Router();
  
  router.get("/", getAllReportProject);
  router.get("/:idReport", getReportProject);
  router.post("/", createReportProject); 
  router.put("/:idComment", updateReportProject);
  router.delete("/:idReport", deleteReportProject);
  
  module.exports = router;