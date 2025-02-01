const express = require("express");
const router = express.Router();

const customerRoute = require("./Master/customerRoute");

router.use("/customer", customerRoute);

module.exports = router;
