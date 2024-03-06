import { FC, useCallback, useState } from "react"
import { Button, Space, Typography, Form } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { AddEditTodo } from "../AddEditTodo"
import { ITodo } from "../../types/todo"
import { TodoStatus } from "../../types/status"
import { deleteTodo, updateTodo } from "../../redux/TodoReducer"
import { useDispatch } from "react-redux"
import { DeleteConfirmationModal } from "../DeleteConfirmationModal"


interface TodoProps {
  todoId: string
  name: string
  status: TodoStatus
}

export const Todo: FC<TodoProps> = ({
  name,
  status,
  todoId
}) => {
  const [isEditTodo, setIsEditTodo] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const handleUpdate = useCallback(
    (data: ITodo) => {
      dispatch(updateTodo(data))
      setIsEditTodo(false)
    },
    []
  )

  const handleEdit = (): void => {
    setIsEditTodo(true)
    form.setFieldsValue({
      name,
    })
  }

  const handleDelete = (): void => {
    setIsDeleteModalVisible(true)
  }

  const handleConfirmDelete = (): void => {
    dispatch(deleteTodo({ id: todoId }))
    setIsDeleteModalVisible(false)
  }

  const handleCancelDelete = (): void => {
    setIsDeleteModalVisible(false)
  }

  return (
    <>
      <AddEditTodo
        title="Edit Todo"
        status={status}
        visible={isEditTodo}
        setIsEditMode={setIsEditTodo}
        onSubmit={handleUpdate}
        todoId={todoId}
        initialValues={{ name, status }}
      />
      <Space direction="horizontal" size="middle"
        style={{
          display: 'flex',
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          marginBottom: '12px',
          border: "1px solid #ccc",
          borderRadius: "8px",
          background: "#e6f7ff"
        }}
      >
        <Typography.Title
          level={5}
          style={{ color: "#1890ff", margin: 0 }}
        >
          {name}
        </Typography.Title>
        <Space wrap>
          <Button type="link" onClick={handleEdit}>
            <EditOutlined style={{ color: "#1890ff", fontSize: "16px" }} />
          </Button>
          <Button type="link" onClick={handleDelete}>
            <DeleteOutlined
              style={{ color: "#ff4d4f", fontSize: "16px" }}
            />
          </Button>
        </Space>
      </Space>
      <DeleteConfirmationModal
        isVisible={isDeleteModalVisible}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        modalInformation="Are you sure you want to delete this todo?"
      />
    </>
  )
}
