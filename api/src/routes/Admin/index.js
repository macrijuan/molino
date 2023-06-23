const {Router}=require("express");
const router = Router();
const dish=require("./Dish")
const user = require("./User/Get");
const diet = require("./Diet");
const admin = require("./Admin_user");
const inventory = require("./Inventory");
const reservation = require("./Reservation");

router.use( user, dish, diet, admin, inventory, reservation );

module.exports=router;