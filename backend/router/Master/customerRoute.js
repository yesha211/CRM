const express = require("express");
const router = express.Router();

const {CreateCustomer, DeleteCustomer, getCustomerByEmail, GetCustomerData, listCustomerAll, UpdateCustomer, UpdateCustomerByParams} = require("../../controller/Master/customerController");



router.post("/createcustomer",  CreateCustomer);

router.delete("/deletecustomer",  DeleteCustomer);

router.get("/getcustomerbyemail",  getCustomerByEmail);

router.get("/getcustomerdata/sCustomerGUID/:sCustomerGUID",  GetCustomerData);

router.get("/listallcustomer",  listCustomerAll);

router.put("/updatecustomer",  UpdateCustomer);

router.put("/updatecustomerbypara/sCustomerGUID/:sCustomerGUID",  UpdateCustomerByParams);

module.exports = router;