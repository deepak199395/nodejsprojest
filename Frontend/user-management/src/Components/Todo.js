import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodo } from '../ReduxToolkit/Slice/TodoSlice'

const Todo = () => {
    const dispatch = useDispatch()
    const todoState = useSelector((state) => state.todo)  
    console.log("deepak", todoState);

    if (todoState.isLoading) {
        return <h1>Loading...</h1>  // Improved loading message
    }

    return (
        <div>
            <button onClick={() => dispatch(fetchTodo())}>Fetch Todo</button>  
            <ul>
                {
                    todoState.data.map((e, index) => <li key={index}>{e.title}</li>)  // Added key prop
                }
            </ul>
        </div>
    )
}

export default Todo
