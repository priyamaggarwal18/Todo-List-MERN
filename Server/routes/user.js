const express=require("express");
const router=express.Router();
const useController = require('../controllers/user');


router.post("/login",useController.handleLogin);
router.post("/signup",useController.handleSignup);
router.get("/users",useController.handleGetAllUsers);

module.exports=router;