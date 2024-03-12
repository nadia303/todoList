import { FilterTypes } from "../types/filterTypes"
import { TodoStatus } from "../types/status"
import { ITodo } from "../types/todo"

export const getFilteredTodos = (todos: ITodo[], filterType: FilterTypes): ITodo[] => {
  switch (filterType) {
    case FilterTypes.COMPLETED:
      return todos.filter((todo) => todo.status === TodoStatus.COMPLETED)
    case FilterTypes.NOT_COMPLETED:
      return todos.filter((todo) => todo.status === TodoStatus.NOT_COMPLETED)
    default:
      return todos
  }
}
