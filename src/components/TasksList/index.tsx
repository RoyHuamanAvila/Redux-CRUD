import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../../app/store";
import { deleteTask } from "../../features/tasks/taskSlice";
 
const TasksList = () => {
    const tasks = useSelector((state: RootState) => state.tasks)
    const dispatch = useDispatch()

    const handleDelete = (id: string) =>{
        dispatch(deleteTask(id))
    }

    return (
        <div>
            <h2>
                {`Total tasks ${tasks.length}`}
            </h2>
            <Link to='/create-task'>
                Create
            </Link> 
            {                
                tasks.map(task => (
                    <div key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <div>
                            <button onClick={()=>{handleDelete(task.id)}}>Delete</button>
                            <Link to={`/create-task/${task.id}`}>Edit</Link>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default TasksList
