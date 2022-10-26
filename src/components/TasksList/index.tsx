import React from "react";
import { useSelector, useDispatch } from "react-redux";
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
            {
                tasks.map(task => (
                    <div key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <button onClick={()=>{handleDelete(task.id)}}>Delete</button>
                    </div>
                ))
            }
        </div>
    )
}

export default TasksList
