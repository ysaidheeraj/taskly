import { AppDispatch } from "../store"
import { RootState } from "../store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { tasksList } from "../apis/TaskList"
import { TaskItem } from "./TaskItem"
import { Task } from "../models/Task"
import { useNavigate } from "react-router-dom"
import BarGraph from "./BarGraph"
export const UserHome = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const tasksListObj = useSelector((state: RootState) => state.tasksList);
    const { loading, tasks} = tasksListObj;
    useEffect(() =>{
        if (!tasks && !loading) {
            dispatch(tasksList());
        }
    }, [tasks, loading])
    const handleCreateTask = () => {
        navigate('../createtask');
    }
  return (
    <div>
        {tasks ? (
            <div className="container">
                <div className="row mb-3">
                    <div className="col-md-3">
                        <div className="input-group">
                            <label className="input-group-text" htmlFor="statusFilter">Status</label>
                            <select className="form-select" id="statusFilter">
                                <option value="all">All</option>
                                <option value={0}>Todo</option>
                                <option value={1}>In Progress</option>
                                <option value={2}>Completed</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search Tasks" />
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <button className="btn btn-dark w-50" onClick={handleCreateTask}>
                            <i className="bi bi-plus me-2"></i>
                            Create Task
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Task Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task: Task) =>(
                                    <TaskItem key={task.id} task={task}/>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-6">
                    <div className="card" style={{'border': 'none'}}>
                        <div className="card-body">
                        <h5 className="card-title">Tasks Statistics</h5>
                            <BarGraph tasks={tasks} />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div> 
        )}
    </div>
  )
}
