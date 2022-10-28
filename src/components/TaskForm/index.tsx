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

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any) => {
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
        <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
            <label htmlFor="title" className="block text-xs font-bold">Task:</label>
            <input 
                name="title"
                type="text" 
                placeholder="title" 
                onChange={handleChange} 
                value={task.title}
                className='w-full p-2 rounded-md bg-zinc-600 mb-2'
            />
            <label htmlFor="description" className="block text-xs font-bold">Description</label>
            <textarea 
                name="description" 
                placeholder="description" 
                onChange={handleChange} 
                value={task.description}
                className='w-full p-2 rounded-md bg-zinc-600 mb-2'
            ></textarea>
            <button className="bg-indigo-600 px-2 py-1" onClick={handleSubmit}>Save</button>
        </form>
    )
}

export default TaskForm;
