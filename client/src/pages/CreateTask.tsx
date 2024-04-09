import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { createTaskRequest } from "../apis/TaskCreate";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { TASK_CREATE_RESET } from "../constants/TaskConstants";
import { tasksList } from "../apis/TaskList";
export const CreateTask = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState('0');
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleCreateTask = () =>{
        dispatch(createTaskRequest({
            name: name,
            description: description,
            status: Number(status)
        }));
    }

    const taskCreate = useSelector((state: RootState) => state.taskCreate);
    const { error, loading, task } = taskCreate;

    useEffect(() =>{
        if(task){
            dispatch({
                type: TASK_CREATE_RESET
            });
            dispatch(tasksList());
            navigate('../');
        }
    }, [error, task, loading])
  return (
    <>
        <Link to="../" className="btn btn-dark btn-primary my-3">
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
        </Link>
        <div className="container border rounded p-4 w-50 h-100">
            <h2>Create Task</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="taskName" className="form-label">Name*</label>
                    <input type="text" className="form-control" id="taskName"  value={name}
                    onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description*</label>
                    <textarea  className="form-control" id="description"  value={description}
                    onChange={(e) => setDescription(e.target.value)} required/>
                </div>
                <div className="mb-3">
                <label htmlFor="status" className="form-label">Status*</label>
                <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value={0}>Todo</option>
                    <option value={1}>InProgress</option>
                    <option value={2}>Completed</option>
                </select>
            </div>
                <button type="submit" className="btn btn-dark w-100" onClick={handleCreateTask}>Create</button>
            </form>
        </div>
    </>
  )
}
