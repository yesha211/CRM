const express = require("express");
const router = express.Router();

const {
  Create,
  Delete,
  Get,
  getTemplateFile,
  listTemplates,
  listTemplatesALL,
  setTemplateInActive,
  Update,
  updateStatus,
  updatebInActive,
} = require("../../controller/Master/MAction_TemplateController");
const { ImageUpload } = require("../../utils/fileUpload");

router.post("/create", ImageUpload(), Create);

router.delete("/delete", Delete);

router.get("/get/sTemplateGUID/:sTemplateGUID", Get);

router.get("/gettemplatefile", getTemplateFile);

router.get("/listtemplates", listTemplates);

router.get("/listtemplatesall", listTemplatesALL);

router.post("/settemplateinactive", setTemplateInActive);

router.put("/update", ImageUpload(), Update);

router.put("/updatestatus", updateStatus);

router.put("/updatebinactive", updatebInActive);

module.exports = router;
