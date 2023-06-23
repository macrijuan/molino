const {Router}=require("express");
const router = Router();
const postDiet = require("./Post");
const putDiet = require("./Put");
const deleteDiet = require("./Delete");

router.use("/diet", postDiet, putDiet, deleteDiet);

module.exports = router;