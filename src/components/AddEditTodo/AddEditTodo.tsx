import { Dispatch, FC, SetStateAction, useCallback, useEffect } from "react"
import { Button, Form, Input, Space, Modal, Select } from "antd"
import { ITodo } from "../../types/todo"
import { TodoStatus } from "../../types/status"

interface AddTodoProps {
  setIsEditMode: Dispatch<SetStateAction<boolean>>
  onSubmit: (data: ITodo) => void
  initialValues?: { name: string, status: TodoStatus }
  visible: boolean
  title?: string
  status: TodoStatus
  todoId?: string

}

export const AddEditTodo: FC<AddTodoProps> = ({
  setIsEditMode,
  onSubmit,
  initialValues,
  visible,
  title = "Add Todo",
  status,
  todoId
}) => {
  const [form] = Form.useForm()

  const handleSubmit = useCallback(
    (data: ITodo) => {
      const todoWithId = todoId ? { ...data, id: todoId } : { ...data, status }
      onSubmit(todoWithId)
      form.resetFields()
      setIsEditMode(false)
    },
    [form, onSubmit, setIsEditMode]
  )

  const handleCancel = (): void => {
    form.resetFields()
    setIsEditMode(false)
  }

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues, form])

  return (
    <Modal
      title={title}
      open={visible}
      footer={null}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter todo name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {initialValues &&
          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
                message: "Please select todo status",
              },
            ]}
          >
            <Select
              defaultValue={form.getFieldValue("status")}
              onChange={(value: TodoStatus): void => {
                form.setFieldsValue({ status: value })
              }} options={[
                { value: TodoStatus.NOT_COMPLETED, label: 'Not completed' },
                { value: TodoStatus.COMPLETED, label: 'Completed' },
              ]}
            />
          </Form.Item>}
        <Space style={{ justifyContent: "flex-end", marginTop: "8px" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            type="primary"
            onClick={handleCancel}
            style={{ backgroundColor: "#faad14", borderColor: "#faad14" }}
          >
            Cancel
          </Button>
        </Space>
      </Form>
    </Modal>
  )
}
