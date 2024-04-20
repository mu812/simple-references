import { Table } from "@radix-ui/themes"

interface taskInterface{
    Id:number;
    Title:string;
    Deadline:string;
    Description:string;
    IsCompleted:number;
}

export const TaskTable =({tasks}:{tasks: taskInterface[]})=>{
    return<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Deadline</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>IsCompleted</Table.ColumnHeaderCell>
    </Table.Row>
  </Table.Header>

  <Table.Body>
    {tasks.map((item:taskInterface)=>{
        return<Table.Row key={item.Id}>
      <Table.RowHeaderCell>{item.Id}</Table.RowHeaderCell>
      <Table.Cell>{item.Title}</Table.Cell>
      <Table.Cell>{item.Deadline}</Table.Cell>
      <Table.Cell>{item.Description}</Table.Cell>
      <Table.Cell>{item.IsCompleted ? "Completed" : "Not Completed"}</Table.Cell>
    </Table.Row>
    })}
  </Table.Body>
</Table.Root>
}