import { taskInterface } from "../types/taskInterface";
import { useForm, SubmitHandler } from "react-hook-form";
import { CustomButton } from "../components/CustomButton";
import { CreateNewTaskService } from "../services/CreateNewTask";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";


export const CreateNewTask = ()=>{

    const {register, handleSubmit} = useForm<taskInterface>(); 

    const queryClient = useQueryClient(); 
    //This will is used for invalidate the queries
    const {mutateAsync} = useMutation({mutationFn: async(data:taskInterface)=>{
        await CreateNewTaskService(data); 
        queryClient.invalidateQueries({queryKey: ["tasks"]}); 

    }}); 

    const sendData:SubmitHandler<taskInterface> = async(data)=>{
        await mutateAsync(data); 
    }

    return<form onSubmit={handleSubmit(sendData)}>
        <input {...register("Title")} placeholder="Title" style={{width:"20rem", height:"2rem"}} />
        <input {...register("Description")} placeholder="Description" style={{width:"20rem", height:"2rem"}}  />
        <input type="datetime-local" {...register("Deadline")} placeholder="Deadline" />
        <CustomButton color={"blue"} type="submit" >
            Create new Task
        </CustomButton>
        
    </form>
}