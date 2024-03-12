import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  Col,
  Row,
  Space,
  Typography,
  Layout,
  List,
  Radio,
  Button,
  Divider,
} from "antd"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux"
import { TodoStatus } from "../../types/status"
import { Content } from "antd/es/layout/layout"
import { getFilteredTodos } from "../../helpers/getFilteredTodos"
import { FilterTypes } from "../../types/filterTypes"
import { Todo } from "../../components/Todo"
import { addTodo } from "../../redux/TodoReducer"
import { AddEditTodo } from "../../components/AddEditTodo"

const { Title } = Typography

export const TodoList: React.FC = () => {
  const { todos } = useSelector((state: RootState) => state.todos)
  const [filterType, setFilterType] = useState(FilterTypes.ALL)
  const [isEditMode, setIsEditMode] = useState(false)
  const isButtonClicked = useRef(false)
  const formRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const handleOnAddTodo = (): void => {
    setIsEditMode(true)
    isButtonClicked.current = true
  }

  const handleOnCreate = useCallback((data: { name?: string, status?: TodoStatus }) => {
    const { name = "", status = TodoStatus.NOT_COMPLETED } = data
    dispatch(addTodo({ name, status }))
    setIsEditMode(false)
  }, [])

  const completedTodos = getFilteredTodos(todos, FilterTypes.COMPLETED).length
  const notCompletedTodos = getFilteredTodos(todos, FilterTypes.NOT_COMPLETED).length

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (formRef.current && !formRef.current.contains(event.target as Node) && !isButtonClicked.current) {
        setIsEditMode(false)
      }
      isButtonClicked.current = false
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [formRef])


  return (
    <Layout style={{ backgroundColor: "#ffffff", minHeight: "100vh", }}>
      <Content style={{
        padding: 40,
      }}>
        <Space direction="horizontal" align="center">
          <Title level={2} type="secondary" >
            Todo List
          </Title>
        </Space>
        <Row align="middle" style={{ marginBottom: '24px' }}>
          <Col span={12}>
            <Space direction="horizontal" >
              <Radio.Group
                onChange={(e): void => setFilterType(e.target.value)}
                value={filterType}
              >
                <Radio.Button value={FilterTypes.ALL}>All ({todos.length})</Radio.Button>
                <Radio.Button value={FilterTypes.COMPLETED}>Completed ({completedTodos})</Radio.Button>
                <Radio.Button value={FilterTypes.NOT_COMPLETED}>Not Completed ({notCompletedTodos})</Radio.Button>
              </Radio.Group>
            </Space>
          </Col>
          {filterType !== FilterTypes.COMPLETED && <Col span={12} style={{ display: "flex", justifyContent: "end" }}>
            <Button
              type="primary"
              disabled={isEditMode}
              onClick={handleOnAddTodo}
              style={{
                width: "50px",
              }}
            >
              +
            </Button>
          </Col>}
        </Row>
        {isEditMode && <div ref={formRef}>
          <AddEditTodo
            setIsEditMode={setIsEditMode}
            onSubmit={handleOnCreate}
          />
        </div>}
        <Divider type="horizontal" />
        <List
          dataSource={getFilteredTodos(todos, filterType)}
          renderItem={({ id, name, status }): React.ReactNode => {
            return (
              <List.Item key={id}>
                <Todo todoId={id}
                  name={name}
                  status={status} />
              </List.Item>
            )
          }}
        />
      </Content>
    </Layout>
  )
}
