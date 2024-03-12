import { Dispatch, FC, SetStateAction, useCallback, useEffect } from "react"
import { Button, Form, Input, Space, Col, Row } from "antd"
import { TodoStatus } from "../../types/status"
import { useSelector } from "react-redux"
import { RootState } from "../../redux"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"

interface AddTodoProps {
  setIsEditMode: Dispatch<SetStateAction<boolean>>
  onSubmit: (data: { name?: string, status?: TodoStatus }) => void
  initialValues?: { name: string }
}

export const AddEditTodo: FC<AddTodoProps> = ({
  setIsEditMode,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm()
  const { maxTodoLength } = useSelector((state: RootState) => state.todos)

  const handleSubmit = useCallback(
    (data: { name?: string, status?: TodoStatus }) => {
      onSubmit(data)
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
    <Row style={{ paddingTop: "20px" }}>
      <Form
        form={form}
        name="validateOnly"
        autoComplete="off"
        onFinish={handleSubmit}
        style={{ width: "500px" }}
      >
        <Row gutter={16} align="top" >
          <Col span={16}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter todo name",
                },
                {
                  max: maxTodoLength,
                  message: `Todo text exceeds the maximum allowed length of ${maxTodoLength} characters`,
                },
              ]}
              style={{ width: '100%' }}
            >
              <Input style={{ fontWeight: "600" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Space >
              <Button type="text" htmlType="submit" style={{ color: "green" }} icon={< CheckOutlined />}
              />
              <Button
                type="text" onClick={handleCancel} style={{ color: "red" }}
                icon={<CloseOutlined />}
              />
            </Space>
          </Col>
        </Row>
      </Form>
    </Row >
  )
}
