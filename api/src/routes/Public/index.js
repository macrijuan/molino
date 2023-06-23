const { Router } = require('express');
const router = Router();
const user = require("./User");
const dish = require("./Dish");
const diet = require("./Diet");
const reservation = require("./Reservation");

router.use( "/", user, dish, diet, reservation );

module.exports = router;