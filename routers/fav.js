var {
    getAllFav,
    getFav,
    createFav,
    updateFav,
    deleteFav,
  } = require("../controllers/fav");
  var express = require("express");
  var router = express.Router();
  
  router.get("/", getAllFav);
  router.get("/:idUser", getFav);
  router.post("/", createFav); 
  router.put("/:idUser", updateFav);
  router.delete("/:idUser", deleteFav);
  
  module.exports = router;