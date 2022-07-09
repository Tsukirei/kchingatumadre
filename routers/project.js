var {
  getAllProject,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project");
var express = require("express");
var router = express.Router();

router.get("/", getAllProject);
router.get("/:id", getProject);
router.post("/", createProject); 
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;