import { TodoStatus } from "./status"

export interface ITodo {
  id: string
  name: string
  status: TodoStatus
}
