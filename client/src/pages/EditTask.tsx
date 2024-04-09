import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { getTaskDetails } from "../apis/TaskDetails";
import { updateTaskRequest } from "../apis/TaskUpdate";

export const EditTask = () => {
    const { taskId } = useParams<{ taskId: string }>();
    const dispatch: AppDispatch = useDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState('0');

    const taskDetails = useSelector((state: RootState) => state.taskDetails);
    const {error, loading, task} = taskDetails;
    
    useEffect(() => {
        if(!error && !loading && !task){
            dispatch(getTaskDetails(taskId));
        }else if(task && task.id != Number(taskId)){
            dispatch(getTaskDetails(taskId));
        }else if(task){
            setName(task.name);
            setDescription(task.description);
            setStatus(task.status.toString());
        }
    }, [task, loading, error])

    const handleUpdateTask = () => {
        if(task){
            dispatch(updateTaskRequest({
                name: name,
                description: description,
                status: Number(status)
            }, task.id?.toString()));
        }
    }
    const handleDeleteTask = () =>{
        console.log("Delete");
    }
  return (
    <>
        <Link to="../" className="btn btn-dark btn-primary my-3">
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
        </Link>
        <div className="container border rounded p-4 w-50 h-100">
            <h2>Task</h2>
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
                <button type="submit" className="btn btn-dark w-100" onClick={handleUpdateTask}>Update</button>
                <button type="submit" className="btn btn-danger w-100 mt-2" onClick={handleDeleteTask}>Delete</button>
            </form>
        </div>
    </>
  )
}
