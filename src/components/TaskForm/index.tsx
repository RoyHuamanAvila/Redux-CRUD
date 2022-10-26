import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../features/tasks/taskSlice";
import {v4 as uuid} from 'uuid'

const TaskForm = () => {
    const [task, setTask] = useState({
        title: '',
        description: ''
    })

    const dispatch = useDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
       setTask({
        ...task,
        [e.target.name]: e.target.value,
       })
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(addTask({...task, id: uuid()}))
    }

    return(
        <form>
            <input name="title" type="text" placeholder="title" onChange={handleChange}/>
            <textarea name="description" placeholder="description" onChange={handleChange}></textarea>
            <button onClick={handleSubmit}>Save</button>
        </form>
    )
}

export default TaskForm;
