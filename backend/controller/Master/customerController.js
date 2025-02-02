const { v4: uuidv4 } = require("uuid");
const ErrorHandler = require("../../utils/default/errorHandler");

exports.CreateCustomer = async (req, res, next) => {
  const {
    sAddress,
    sCustomerName,
    sEmail,
    sLanguage,
    sMobileNumber,
    sSocialAccounts,
  } = req.body;
  const pool = req.pool;
  let address;
  let language;
  let socialAccounts;
  //		stringify
  language = JSON.stringify(sLanguage);
  address = JSON.stringify(sAddress);
  socialAccounts = JSON.stringify(sSocialAccounts);

  genUUID = uuidv4();
  let createdMCustomer;
  try {
    let [results] = await pool.query(
      `INSERT INTO MCustomer(sMobileNumber, sCustomerName, sSocialAccounts, sAddress, sLanguage, sCustomerGUID, sEmail) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        sMobileNumber,
        sCustomerName,
        socialAccounts,
        address,
        language,
        genUUID,
        sEmail,
      ]
    );
    // Retrieve the newly created MCustomer
    const [rows] = await pool.query(
      `SELECT * FROM MCustomer WHERE sCustomerGUID = ?`,
      [genUUID]
    );
    createdMCustomer = rows[0];
  } catch (err) {
    const error = new ErrorHandler(
      "Error while Inserting MCustomer record!",
      500
    );
    return next(error);
  }

  //   if (createdMCustomer.sLanguage) {
  //     //		JSON.parse
  //     createdMCustomer.sLanguage = JSON.parse(createdMCustomer.sLanguage);
  //   }

  res.status(201);
  res.json({ Status: "201", Message: "Success", data: createdMCustomer });
};

exports.DeleteCustomer = async (req, res, next) => {
  const { sCustomerGUID } = req.body;
  const pool = req.pool;
  try {
    await pool.query(`DELETE FROM MCustomer  WHERE sCustomerGUID = ? `, [
      sCustomerGUID,
    ]);
  } catch (err) {
    const error = new ErrorHandler(
      "Error while Deleting MCustomer record!",
      500
    );
    return next(error);
  }
  res.status(200);
  res.json({ Status: "20", Message: "Success" });
};

exports.getCustomerByEmail = async (req, res, next) => {
  const { sEmail } = req.query;

  console.log(sEmail);
  const pool = req.pool;
  let var_MCustomer_List;
  try {
    const [rows] = await pool.query(
      `SELECT sCustomerName, sLanguage, sMobileNumber, bInActive, sAddress, sSocialAccounts, sEmail, sCustomerGUID FROM MCustomer WHERE sEmail = ? `,
      [sEmail]
    );
    var_MCustomer_List = rows[0];

    console.log(var_MCustomer_List);
  } catch (err) {
    const error = new ErrorHandler(
      "Error while Selecting MCustomer record!",
      500
    );
    return next(error);
  }

  if (var_MCustomer_List.sLanguage) {
    //JSON.Parse;
    var_MCustomer_List.sLanguage = JSON.parse(var_MCustomer_List.sLanguage);
  }
  res.status(200);
  res.json({ msg: "Record Fetched !", data: var_MCustomer_List });
};

exports.GetCustomerData = async (req, res, next) => {
  const { sCustomerGUID } = req.params;
  const pool = req.pool;
  let selectedMCustomer;
  try {
    const [rows] = await pool.query(
      `SELECT sMobileNumber, sEmail, sLanguage, sCustomerGUID, sSocialAccounts, sCustomerName, sAddress FROM MCustomer WHERE sCustomerGUID = ? `,
      [sCustomerGUID]
    );
    selectedMCustomer = rows[0];
  } catch (err) {
    const error = new ErrorHandler(
      "Error while Selecting MCustomer record!",
      500
    );
    return next(error);
  }
  if (selectedMCustomer.sLanguage) {
    //		JSON.Parse
    selectedMCustomer.sLanguage = JSON.parse(selectedMCustomer.sLanguage);
  }
  res.status(201);
  res.json({ Status: "201", Message: "Success", data: selectedMCustomer });
};

exports.listCustomerAll = async (req, res, next) => {
  const pool = req.pool;
  let var_MCustomer_List;
  try {
    const [rows] = await pool.query(
      `SELECT sMobileNumber, bInActive, sLanguage, sEmail, sCustomerGUID, sCustomerName, sAddress, sSocialAccounts FROM MCustomer`
    );
    var_MCustomer_List = rows;
  } catch (err) {
    const error = new ErrorHandler(
      "Error while Selecting MCustomer record!",
      500
    );
    return next(error);
  }
  //		JSOn.Pasre
  if (var_MCustomer_List.sLanguage) {
    var_MCustomer_List.forEach((element) => {
      element.sLanguage = JSON.parse(element.sLanguage);
    });
  }

  res.status(200);
  res.json({ msg: "Record Fetched !", data: var_MCustomer_List });
};

exports.UpdateCustomer = async (req, res, next) => {
  const {
    bInActive,
    sAddress,
    sCustomerName,
    sEmail,
    sLanguage,
    sMobileNumber,
    sSocialAccounts,
    sCustomerGUID,
  } = req.body;
  const pool = req.pool;
  let address;
  let language;
  let socialAccounts;
  //		JSON.stringify
  language = JSON.stringify(sLanguage);
  address = JSON.stringify(sAddress);
  socialAccounts = JSON.stringify(sSocialAccounts);

  let updatedMCustomer;
  try {
    await pool.query(
      `UPDATE MCustomer SET sAddress = ?, sCustomerName = ?, sSocialAccounts = ?, sLanguage = ?, sMobileNumber = ?, bInActive = ?, sEmail = ? WHERE sEmail = ? `,
      [
        address,
        sCustomerName,
        socialAccounts,
        language,
        sMobileNumber,
        bInActive,
        sEmail,
        sEmail,
      ]
    );
    const [rows] = await pool.query(
      `SELECT * FROM MCustomer WHERE sEmail = ? `,
      [sEmail]
    );
    updatedMCustomer = rows[0];
  } catch (err) {
    const error = new ErrorHandler(
      "Error while Updating MCustomer record!",
      500
    );
    return next(error);
  }
  if (updatedMCustomer.sLanguage) {
    //		JSON.parse
    updatedMCustomer.sLanguage = JSON.parse(updatedMCustomer.sLanguage);
  }
  res.status(201);
  res.json({ Status: "201", Message: "Success", data: updatedMCustomer });
};

exports.UpdateCustomerByParams = async (req, res, next) => {
  const {
    sAddress,
    sCustomerName,
    sEmail,
    sLanguage,
    sMobileNumber,
    sSocialAccounts,
    bInActive,
  } = req.body;
  const { sCustomerGUID } = req.params;
  const pool = req.pool;
  let address;
  let language;
  let socialAccounts;
  //		JSON.stringify
  language = JSON.stringify(sLanguage);
  address = JSON.stringify(sAddress);
  socialAccounts = JSON.stringify(sSocialAccounts);

  let updatedMCustomer;
  try {
    await pool.query(
      `UPDATE MCustomer SET sAddress = ?, sEmail = ?, sSocialAccounts = ?, sMobileNumber = ?, bInActive = ?, sCustomerName = ?, sLanguage = ? WHERE sCustomerGUID = ? `,
      [
        address,
        sEmail,
        socialAccounts,
        sMobileNumber,
        bInActive,
        sCustomerName,
        language,
        sCustomerGUID,
      ]
    );
    const [rows] = await pool.query(
      `SELECT * FROM MCustomer WHERE sCustomerGUID = ? `,
      [sCustomerGUID]
    );
    updatedMCustomer = rows[0];
  } catch (err) {
    const error = new ErrorHandler(
      "Error while Updating MCustomer record!",
      500
    );
    return next(err);
  }
  if (updatedMCustomer.sLanguage) {
    //		JSON.parse
    updatedMCustomer.sLanguage = JSON.parse(updatedMCustomer.sLanguage);
  }
  res.status(201);
  res.json({ Status: "201", Message: "Success", data: updatedMCustomer });
};
