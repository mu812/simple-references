import { GetAllTasksService } from "../services/GetAllTasks"
import { useQuery } from "@tanstack/react-query"
import { TaskTable } from "../components/TaskTable";
import { CreateNewTask } from "../components/CreateNewTasks";

export default function Tasks(){

    //This is used when page first load to query the data at first
    const {isPending,error ,data} = useQuery({
        queryKey: ["tasks"],
        queryFn: GetAllTasksService,
        staleTime: Infinity
    }); 

    if (isPending) return <div>Waiting</div>

    if (error) return <div>Error </div>


    return <>
    { data && <TaskTable tasks={data} /> }

    <CreateNewTask />

    </>
}