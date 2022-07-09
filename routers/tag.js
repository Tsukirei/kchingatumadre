var {
    getAllTag,
    getTag,
    createTag,
    updateTag,
    deleteTag,
  } = require("../controllers/tag");
  var express = require("express");
  var router = express.Router();
  
  router.get("/", getAllTag);
  router.get("/:idTag", getTag);
  router.post("/", createTag); 
  router.put("/:idTag", updateTag);
  router.delete("/:idTag", deleteTag);
  
  module.exports = router;