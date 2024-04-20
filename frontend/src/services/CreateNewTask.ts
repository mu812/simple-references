
import { taskInterface } from "../types/taskInterface";

export const CreateNewTaskService = async (input: taskInterface)=>{
    const response = await fetch("http://localhost:8080/tasks/create", {
        method: "POST", 
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
    }); 

    const data = await response.json(); 
    if(data.message && data.message==="created"){
        return true; 
    }else{
        return false; 
    }
}