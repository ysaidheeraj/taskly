import { useNavigate } from "react-router-dom";
import { Task } from "../models/Task"

export const TaskItem = ({ task }: { task: Task }) => {
    const navigate = useNavigate();
    const handleClick = () =>{
        navigate('/edittask/'+task.id?.toString());
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
