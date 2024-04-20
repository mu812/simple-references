/* eslint-disable prettier/prettier */
export default async function getAllTasks(){
  const response = await fetch("http://localhost:8080/tasks");  
  const data = await response.json();
  return data.tasks;
}