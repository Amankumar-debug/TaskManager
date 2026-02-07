import { Router } from "express";
import { addTask, allTasks, deleteTask, getSingleTask, updateTask } from "../controllers/task.controller.js";
const router=Router();

router.route("/").get((req,res)=>{
    res.send("Hello World");
})
router.route("/add_task").post(addTask);
router.route("/all_tasks").get(allTasks);
router.route("/update_task").post(updateTask);
router.route("/delete_task").post(deleteTask);
router.route("/task/:id").get(getSingleTask);

export default router;