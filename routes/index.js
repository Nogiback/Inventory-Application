const express = require("express");
const router = express.Router();
const discController = require("../controllers/discController");

/* GET home page */
router.get("/", discController.index);

module.exports = router;
