const{Router}=require("express");
const router = Router();
const postElement = require("./Post");
const getElement = require("./Get");
const putElement = require("./Put");
const deleteElement = require("./Delete");

router.use("/inventory", postElement, getElement, putElement, deleteElement);

module.exports = router;