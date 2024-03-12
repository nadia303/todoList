import { FC, useCallback, useEffect, useRef, useState } from "react"
import { Button, Space, Typography, Form, Checkbox, CheckboxProps } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { TodoStatus } from "../../types/status"
import { deleteTodo, updateTodo } from "../../redux/TodoReducer"
import { useDispatch } from "react-redux"
import { DeleteConfirmationModal } from "../DeleteConfirmationModal"
import { AddEditTodo } from "../AddEditTodo"


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
  const [isHovered, setIsHovered] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const isButtonHovered = useRef(false)

  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const handleEdit = (): void => {
    setIsEditTodo(true)
    form.setFieldsValue({
      name
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

  const handleMouseEnter = (): void => {
    setIsHovered(true)
    isButtonHovered.current = true
  }

  const handleMouseLeave = (): void => {
    setIsHovered(false)
    isButtonHovered.current = false
  }

  const onChange: CheckboxProps['onChange'] = (e): void => {
    const status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.NOT_COMPLETED
    dispatch(updateTodo({ id: todoId, status }))
  }

  const handleSubmit = useCallback((data: { name?: string, status?: TodoStatus }): void => {
    dispatch(updateTodo({ id: todoId, ...data }))
    setIsEditTodo(false)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (formRef.current && !formRef.current.contains(event.target as Node) && !isButtonHovered.current) {
        setIsEditTodo(false)
      }
      isButtonHovered.current = false
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [formRef])


  return (
    <>
      <Space style={{ height: "40px" }}>
        {isEditTodo ?
          <div ref={formRef}>
            <AddEditTodo setIsEditMode={setIsEditTodo} onSubmit={handleSubmit} initialValues={{ name: name }} />
          </div>
          :
          <Space direction="horizontal" size="middle"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Checkbox onChange={onChange} checked={status === TodoStatus.COMPLETED} />
            <Typography.Title
              level={5}
              style={{ margin: 0 }}
            >
              {name}
            </Typography.Title>
            {isHovered &&
              <Space style={{ height: '24px' }}  >
                <Button type="link" onClick={handleEdit} icon={<EditOutlined style={{ color: "#1890ff", fontSize: "16px" }} />} />
                <Button type="link" onClick={handleDelete} icon={<DeleteOutlined style={{ color: "#ff4d4f", fontSize: "16px" }} />} />
              </Space>
            }
          </Space>}
      </Space >
      <DeleteConfirmationModal
        isVisible={isDeleteModalVisible}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        modalInformation="Are you sure you want to delete this todo?"
      />
    </>
  )
}
