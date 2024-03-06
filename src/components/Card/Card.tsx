import React, { useCallback, useState } from "react"
import { Button, Card as BasicCard } from "antd"
import { AddEditTodo } from "../AddEditTodo"
import { ITodo } from "../../types/todo"
import { addTodo } from "../../redux/TodoReducer"
import { useDispatch } from "react-redux"
import { Todo } from "../Todo"
import { TodoStatus } from "../../types/status"

interface CardProps {
  title: string
  status: TodoStatus
  todos: ITodo[]
}

export const Card: React.FC<CardProps> = ({
  title,
  status,
  todos,
}) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const dispatch = useDispatch()

  const handleOnAddTodo = (): void => {
    setIsEditMode(true)
  }

  const handleOnCreate = useCallback((data: Omit<ITodo, 'id'>) => {
    dispatch(addTodo(data))
  }, [])

  return (
    <BasicCard title={title} style={{
      minHeight: '280px', background: "#a6c7e0", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
    }}
    >
      <Button
        onClick={handleOnAddTodo}
        disabled={isEditMode}
        style={{
          width: "40px",
          position: "absolute",
          top: "8px",
          right: "8px",
          backgroundColor: "#1890ff",
          borderColor: "#1890ff",
          color: "#fff",
        }}
      >
        +
      </Button>
      {todos.map(({ name, status, id }: ITodo) =>
        <Todo
          key={id}
          todoId={id}
          name={name}
          status={status}
        />)}
      <AddEditTodo
        visible={isEditMode}
        setIsEditMode={setIsEditMode}
        onSubmit={handleOnCreate}
        title="Add Todo"
        status={status}
      />
    </BasicCard>
  )
}
