import { Radio } from "antd"
import { useState } from "react"


export const Filter: React.FC = () => {
  const [filterType, setFilterType] = useState('all')
  return (
    <Radio.Group
      onChange={(e): void => setFilterType(e.target.value)}
      value={filterType}
    >
      <Radio.Button value="all">All</Radio.Button>
      <Radio.Button value="completed">Completed</Radio.Button>
      <Radio.Button value="current">Not Completed</Radio.Button>
    </Radio.Group>

  )
}