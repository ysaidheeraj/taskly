import { Task } from "../models/Task"

export const TaskItem = ({ task }: { task: Task }) => {
    const handleClick = () =>{
        console.log("clicked on ", task.name);
    }
  return (
    <tr style={{"cursor": "pointer"}} onClick={handleClick}>
        <td>{task.name}</td>
        {task.status == 0 ? (
            <td>Todo</td>
        ) : task.status == 1 ? (
            <td>In Progress</td>
        ) : (
            <td>Completed</td>
        )}
    </tr>
  )
}
