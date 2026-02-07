import Task from "../models/task.model.js";



export const addTask=async(req,res)=>{
    try {

        const {title,description,status}=req.body;

        if(!title||!description||!status){
            return res.status(400).json({message:"Please provide all the fields"});
        }

        const task=await Task.create({
            title,
            description,
            status
        })
        
        return res.status(200).json({message:"task created successfully"});
        
    } catch (error) {
        return res.status(500).json({message:`something went wrong ${error}`});
    }
}

export const allTasks=async(req, res)=>{
    try {

        const tasks=await Task.find({});
        return res.status(200).json({tasks});

        
    } catch (error) {
        return res.status(500).json({message:`something went wrong ${error}`});
    }
}

export const updateTask=async(req, res)=>{
    try {
     
        const {_id,...newTaskData}=req.body;
        const task=await Task.findOne({_id:_id});

        if(!task){
            return res.status(400).json({message:"task not found"});
        }

       Object.assign(task,newTaskData);
       await task.save();

       return res.status(200).json({message:"task updated successfully"});

        
    } catch (error) {
        return res.status(500).json({message:`something went wrong ${error}`});
    }
}


export const deleteTask=async(req,res)=>{
    try {

        const {_id}=req.body;

        if(!_id){
            return res.status(400).json({message:"Please provide id"});
        }

        const task=
await Task.findOneAndDelete({_id:_id});

return res.status(200).json({message:"task deleted successfully"});
        
    } catch (error) {
        return res.status(500).json({message:`something went wrong ${error}`});
    }
}

export const getSingleTask=async(req,res)=>{
    try {

        const task=await Task.findById(req.params.id);

        return res.status(200).json({task});
        
    } catch (error) {
        return res.status(500).json({message:`something went wrong ${error}`});
    }
}