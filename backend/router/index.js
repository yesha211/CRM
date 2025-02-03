const express = require("express");
const router = express.Router();

const customerRoute = require("./Master/customerRoute");
const MAction_TemplateRoute = require("./Master/MAction_TemplateRoute");

router.use("/customer", customerRoute);
router.use("/mactiontemplate", MAction_TemplateRoute);

module.exports = router;
