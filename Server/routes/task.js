const express=require("express");
const taskRouter=express.Router({mergeParams:true});
const useController = require('../controllers/user');

taskRouter.get("/",useController.handleGetUserTasks);
taskRouter.delete("/:taskID",useController.handleDeleteUser);
taskRouter.patch("/:taskID",useController.handlePatchUserTask);
taskRouter.post("/",useController.handleCreateNewTask);

module.exports=taskRouter;