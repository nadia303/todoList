import React from "react"
import {
  Col,
  Row,
  Space,
  Typography,
  Divider,
  Layout,
} from "antd"
import { Card } from "../../components/Card"
import { useSelector } from "react-redux"
import { RootState } from "../../redux"
import { TodoStatus } from "../../types/status"
import { Content } from "antd/es/layout/layout"

const { Title } = Typography

export const TodoList: React.FC = () => {
  const { todos } = useSelector((state: RootState) => state.todos)

  return (
    <Layout style={{ height: '100vh' }}>
      <Content style={{
        padding: 40,
      }}>
        <Space direction="horizontal" align="center">
          <Title level={2} type="secondary" >
            Todo List
          </Title>
          <Divider />
        </Space>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12}>
            <Card
              title="NOT COMPLETED"
              todos={todos?.filter(el => el.status === TodoStatus.NOT_COMPLETED)}
              status={TodoStatus.NOT_COMPLETED}
            />
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Card
              title="COMPLETED"
              todos={todos?.filter(el => el.status === TodoStatus.COMPLETED)}
              status={TodoStatus.COMPLETED}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}
