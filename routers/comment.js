var {
    getAllComment,
    getComment,
    createComment,
    updateComment,
    deleteComment,
  } = require("../controllers/comment");
  var express = require("express");
  var router = express.Router();
  
  router.get("/", getAllComment);
  router.get("/:idComment", getComment);
  router.post("/", createComment); 
  router.put("/:idComment", updateComment);
  router.delete("/:idComment", deleteComment);
  
  module.exports = router;