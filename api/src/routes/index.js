const { Router } = require('express');
const router = Router();

const public = require("./Public");
const admin = require("./Admin");
const developer = require("./Developer");

router.use("/public", public);
router.use("/administrator", admin);
router.use("/developer", developer);

module.exports = router;