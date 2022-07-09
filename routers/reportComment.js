var {
    getAllReportComment,
    getReportComment,
    createReportComment,
    updateReportComment,
    deleteReportComment,
  } = require("../controllers/reportComment");
  var express = require("express");
  var router = express.Router();
  
  router.get("/", getAllReportComment);
  router.get("/:idReport", getReportComment);
  router.post("/", createReportComment); 
  router.put("/:idReport", updateReportComment);
  router.delete("/:idReport", deleteReportComment);
  
  module.exports = router;