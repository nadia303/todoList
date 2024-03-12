import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ITodo } from "../types/todo"
import { generateId } from "../helpers/generateId"
import { TodoStatus } from "../types/status"


const initialState: TodosInitialState = {
  todos: [],
  maxTodoLength: 100
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<ITodo, 'id'>>) => {
      const newTodo = { ...action.payload, id: generateId(), status: TodoStatus.NOT_COMPLETED }
      state.todos = [...state.todos, newTodo]
    },
    updateTodo: (state, action: PayloadAction<Partial<ITodo>>) => {
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
  maxTodoLength: number
}

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions
export default todoSlice.reducer
