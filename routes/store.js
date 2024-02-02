const express = require("express");
const router = express.Router();

// Require controller modules.
const discTypeController = require("../controllers/discTypeController");
const manufacturerController = require("../controllers/manufacturerController");
const discController = require("../controllers/discController");
const indexController = require("../controllers/indexController");

router.get("/", indexController.store);

/// DISC ROUTES ///

router.get("/discs", discController.disc_list);
router.get("discs/create", discController.disc_create_get);
router.post("discs/create", discController.disc_create_post);
router.get("/discs/:id/delete", discController.disc_delete_get);
router.post("/discs/:id/delete", discController.disc_delete_post);
router.get("/discs/:id/update", discController.disc_update_get);
router.post("/discs/:id/update", discController.disc_update_post);
router.get("/discs/:id", discController.disc_details);

/// DISC TYPE ROUTES ///

router.get("/discTypes", discTypeController.discType_list);
router.get("discType/create", discTypeController.discType_create_get);
router.post("discType/create", discTypeController.discType_create_post);
router.get("/discType/:id/delete", discTypeController.discType_delete_get);
router.post("/discType/:id/delete", discTypeController.discType_delete_post);
router.get("/discType/:id/update", discTypeController.discType_update_get);
router.post("/discType/:id/update", discTypeController.discType_update_post);
router.get("/discType/:id", discTypeController.discType_details);

/// MANUFACTURER ROUTES ///

router.get("/manufacturers", manufacturerController.manufacturer_list);
router.get(
  "manufacturer/create",
  manufacturerController.manufacturer_create_get
);
router.post(
  "manufacturer/create",
  manufacturerController.manufacturer_create_post
);
router.get(
  "/manufacturer/:id/delete",
  manufacturerController.manufacturer_delete_get
);
router.post(
  "/manufacturer/:id/delete",
  manufacturerController.manufacturer_delete_post
);
router.get(
  "/manufacturer/:id/update",
  manufacturerController.manufacturer_update_get
);
router.post(
  "/manufacturer/:id/update",
  manufacturerController.manufacturer_update_post
);
router.get("/manufacturer/:id", manufacturerController.manufacturer_details);

module.exports = router;
