import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ITodo } from "../types/todo"
import { generateId } from "../helpers/generateId"


const initialState: TodosInitialState = {
  todos: []
}

export const todoSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<ITodo, 'id'>>) => {
      const newTodo = { ...action.payload, id: generateId() }
      state.todos = [...state.todos, newTodo]
    },
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      const updatedTodoIndex = state.todos.findIndex(el => el.id === action.payload.id)

      if (updatedTodoIndex !== -1) {
        state.todos[updatedTodoIndex] = { ...state.todos[updatedTodoIndex], ...action.payload }
      }

    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload
      state.todos = state.todos.filter(el => el.id !== id)
    },
  }
})

export interface TodosInitialState {
  todos: ITodo[]
}

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions
export default todoSlice.reducer
