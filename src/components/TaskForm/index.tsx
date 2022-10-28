/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../../features/tasks/taskSlice";
import {v4 as uuid} from 'uuid'
import { useNavigate, useParams } from "react-router";
import { RootState } from "../../app/store";

const TaskForm = () => {
    const [task, setTask] = useState<any>({
        title: '',
        description: ''
    })
    const {id} = useParams();

    const tasks = useSelector((state: RootState) => state.tasks)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
       setTask({
        ...task,
        [e.target.name]: e.target.value,
       })
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if(id){
            dispatch(editTask(task));
        }else{
            dispatch(addTask({...task, id: uuid()}))
        }
        navigate('/')
    }

    useEffect(()=>{
        if(id) {
            setTask(tasks.find(task => task.id === id))
        }
    },[])    

    return(
        <form>
            <input name="title" type="text" placeholder="title" onChange={handleChange} value={task.title}/>
            <textarea name="description" placeholder="description" onChange={handleChange} value={task.description}></textarea>
            <button onClick={handleSubmit}>Save</button>
        </form>
    )
}

export default TaskForm;
