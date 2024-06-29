import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../ReduxToolkit/Slice/TodoSlice'

const store = configureStore({
    reducer: {
        todo: todoReducer
    }
})

export default store
