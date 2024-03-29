const express = require("express");
const router = express.Router();

// Require controller modules.
const discTypeController = require("../controllers/discTypeController");
const manufacturerController = require("../controllers/manufacturerController");
const discController = require("../controllers/discController");
const indexController = require("../controllers/indexController");

router.get("/", indexController.store);

/// DISC ROUTES ///

router.get("/disc/create", discController.disc_create_get);
router.post("/disc/create", discController.disc_create_post);
router.get("/disc/:id/delete", discController.disc_delete_get);
router.post("/disc/:id/delete", discController.disc_delete_post);
router.get("/disc/:id/update", discController.disc_update_get);
router.post("/disc/:id/update", discController.disc_update_post);
router.get("/disc/:id", discController.disc_details);
router.get("/discs", discController.disc_list);

/// DISC TYPE ROUTES ///

router.get("/discType/create", discTypeController.discType_create_get);
router.post("/discType/create", discTypeController.discType_create_post);
router.get("/discType/:id/delete", discTypeController.discType_delete_get);
router.post("/discType/:id/delete", discTypeController.discType_delete_post);
router.get("/discType/:id/update", discTypeController.discType_update_get);
router.post("/discType/:id/update", discTypeController.discType_update_post);
router.get("/discType/:id", discTypeController.discType_details);
router.get("/discTypes", discTypeController.discType_list);

/// MANUFACTURER ROUTES ///

router.get(
  "/manufacturer/create",
  manufacturerController.manufacturer_create_get
);
router.post(
  "/manufacturer/create",
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
router.get("/manufacturers", manufacturerController.manufacturer_list);

module.exports = router;
