const { v4: uuidv4 } = require("uuid");
const ErrorHandler = require("../../utils/default/errorHandler");

exports.Create = async (req, res, next) => {
  const { bInActive, sMessage_to_send, sTemplate_ID, sTemplate_Send_via } =
    req.body;
  const pool = req.pool;
  let sFile_to_Send;
  //		image upload
  // sFile_to_Send = req.filePaths

  genUUID = uuidv4();
  let createdMAction_Template;
  try {
    let [results] = await pool.query(
      `INSERT INTO MAction_Template(sTemplate_ID, sTemplateGUID, sMessage_to_send, bInActive, sTemplate_Send_via) VALUES ( ?, ?, ?, ?, ?)`,
      [sTemplate_ID, genUUID, sMessage_to_send, bInActive, sTemplate_Send_via]
    );
    // Retrieve the newly created MAction_Template
    const [rows] = await pool.query(
      `SELECT * FROM MAction_Template WHERE sTemplateGUID = ?`,
      [genUUID]
    );
    createdMAction_Template = rows[0];
  } catch (err) {
    const error = new ErrorHandler(
      "Error while Inserting MAction_Template record!",
      500
    );
    return next(error);
  }
  res.status(201);
  res.json({
    Status: "201",
    Message: "Success",
    data: createdMAction_Template,
  });
};

exports.Delete = async (req, res, next) => {
  const { sTemplateGUID } = req.query;
  const pool = req.pool;
  try {
    await pool.query(`DELETE FROM MAction_Template  WHERE sTemplateGUID = ? `, [
      sTemplateGUID,
    ]);
  } catch (err) {
    const error = new ErrorHandler(
      "Error while Deleting MAction_Template record!",
      200
    );
    return next(error);
  }
  res.status(200);
  res.json({ Status: "20", Message: "Success" });
};

exports.Get = async (req, res, next) => {
  const { sTemplateGUID } = req.params;
  const pool = req.pool;
  let selectedMAction_Template;
  try {
    const [rows] = await pool.query(
      `SELECT bInActive, sMessage_to_send, sTemplate_ID, sTemplateGUID, sTemplate_Send_via FROM MAction_Template WHERE sTemplateGUID = ? `,
      [sTemplateGUID]
    );
    selectedMAction_Template = rows[0];
  } catch (err) {
    const error = new ErrorHandler(
      "Error while Selecting MAction_Template record!",
      500
    );
    return next(error);
  }
  res.status(201);
  res.json({
    Status: "201",
    Message: "Success",
    data: selectedMAction_Template,
  });
};

exports.getTemplateFile = async (req, res, next) => {
  //   const { sTemplateGUID } = req.body;
  //   const pool = req.pool;
  //   let var_MAction_Template_List;
  //   try {
  //     const [rows] = await pool.query(
  //       `SELECT sFile_to_Send, sTemplateGUID FROM MAction_Template WHERE sTemplateGUID = ? `,
  //       [sTemplateGUID]
  //     );
  //     var_MAction_Template_List = rows[0];
  //   } catch (err) {
  //     const error = new ErrorHandler(
  //       "Error while Selecting MAction_Template record!",
  //       500
  //     );
  //     return next(error);
  //   }
  //   res.status(200);
  //   res.json({
  //     msg: "Attachment File Selected !",
  //     data: var_MAction_Template_List,
  //   });
};

exports.listTemplates = async (req, res, next) => {
  const pool = req.pool;
  let var_MAction_Template_List;
  try {
    const [rows] = await pool.query(
      `SELECT sTemplate_Send_via, sTemplate_ID, bInActive, sTemplateGUID, sMessage_to_send FROM MAction_Template WHERE bInActive = ? `,
      [0]
    );
    var_MAction_Template_List = rows;
  } catch (err) {
    const error = new ErrorHandler(
      "Error while Selecting MAction_Template record!",
      500
    );
    return next(error);
  }
  res.status(200);
  res.json({ msg: "Record Fetched !", data: var_MAction_Template_List });
};

exports.listTemplatesALL = async (req, res, next) => {
  const pool = req.pool;
  let var_MAction_Template_List;

  const [rows] = await pool.query(
    `SELECT sTemplate_Send_via, bInActive, sTemplate_ID, sTemplateGUID, sMessage_to_send FROM MAction_Template`
  );
  var_MAction_Template_List = rows;
  res.status(200);
  res.json({ msg: "Record Fetched !", data: var_MAction_Template_List });
};

exports.setTemplateInActive = async (req, res, next) => {
  const { sTemplateGUID, bInActive } = req.body;
  const pool = req.pool;
  let updatedMAction_Template;

  await pool.query(
    `UPDATE MAction_Template SET bInActive = ? WHERE sTemplateGUID = ? `,
    [bInActive, sTemplateGUID]
  );
  const [rows] = await pool.query(
    `SELECT * FROM MAction_Template WHERE sTemplateGUID = ? `,
    [sTemplateGUID]
  );
  updatedMAction_Template = rows[0];
  res.status(200);
  res.json({ msg: "Record Updated !", data: updatedMAction_Template });
};

exports.Update = async (req, res, next) => {
  const {
    bInActive,
    sMessage_to_send,
    sTemplate_ID,
    sTemplate_Send_via,
    sTemplateGUID,
  } = req.body;
  const pool = req.pool;
  let sFile_to_Send;
  //		image upload
  //   sFile_to_Send = req.filePaths;

  let var_MAction_Template_List;

  //   const [rows] = await pool.query(
  //     `SELECT sFile_to_Send, sTemplateGUID FROM MAction_Template WHERE sTemplateGUID = ? `,
  //     [sTemplateGUID]
  //   );
  //   var_MAction_Template_List = rows[0];
  //   if (!sFile_to_Send) {
  //     sFile_to_Send = var_MAction_Template_List.sFile_to_Send;
  //   } else {
  //   }
  let updatedMAction_Template;
  try {
    await pool.query(
      `UPDATE MAction_Template SET  bInActive = ?, sTemplate_Send_via = ?, sTemplate_ID = ?, sMessage_to_send = ? WHERE sTemplateGUID = ? `,
      [
        bInActive,
        sTemplate_Send_via,
        sTemplate_ID,
        sMessage_to_send,
        sTemplateGUID,
      ]
    );
    const [rows] = await pool.query(
      `SELECT * FROM MAction_Template WHERE sTemplateGUID = ? `,
      [sTemplateGUID]
    );
    updatedMAction_Template = rows[0];
  } catch (err) {
    const error = new ErrorHandler(
      "Error while Updating MAction_Template record!",
      500
    );
    return next(error);
  }
  res.status(201);
  res.json({
    Status: "201",
    Message: "Success",
    data: updatedMAction_Template,
  });
};

exports.updateStatus = async (req, res, next) => {
  const { bInActive, data } = req.body;
  let results;
  let rows;
  const pool = req.pool;
  let data_array = data;
  data_array.forEach(async (var_array) => {
    let updatedMAction_Template;
    try {
      await pool.query(
        `UPDATE MAction_Template SET bInActive = ? WHERE sTemplateGUID = ? `,
        [bInActive, var_array.sTemplateGUID]
      );
      const [rows] = await pool.query(
        `SELECT * FROM MAction_Template WHERE sTemplateGUID = ? `,
        [var_array.sTemplateGUID]
      );
      updatedMAction_Template = rows;
    } catch (err) {
      const error = new ErrorHandler("Error While Updating !", 400);
      return next(error);
    }
  });

  res.status(200);
  res.json({ msg: "Record Updated !" });
};
