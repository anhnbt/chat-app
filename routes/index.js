const { Router } = require('express');
const router = Router();
// Require controller modules.
const home_controller = require("../controllers/homeController");

// GET home page.
router.get("/", home_controller.index);

module.exports = router;
