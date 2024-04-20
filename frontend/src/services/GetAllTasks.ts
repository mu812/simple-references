
interface taskInterface {
    Id: number;
    Title: string;
    Deadline: string;
    Description: string;
    IsCompleted: number;
}
export const GetAllTasksService = async (): Promise<taskInterface[] | undefined>=>{
    console.log("he")
    const response = await fetch("http://localhost:8080/tasks"); 
    const data = await response.json(); 
    return data.tasks; 
}