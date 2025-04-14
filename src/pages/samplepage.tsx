import React, { useState } from 'react'
import BaseTable from './BaseTable'
import UserForm from './UserForm'
import tableConfig from './TableConfig'

const SamplePage = () => {
  // Dữ liệu mẫu
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      status: 'Hoạt động',
      createdAt: '2025-04-01'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@example.com',
      status: 'Hoạt động',
      createdAt: '2025-04-02'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@example.com',
      status: 'Không hoạt động',
      createdAt: '2025-04-03'
    }
  ])

  const [loading, setLoading] = useState(false)

  // Xử lý thêm mới
  const handleAdd = (values) => {
    // Giả lập thêm mới user
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      ...values,
      createdAt: new Date().toISOString().split('T')[0]
    }

    setUsers([...users, newUser])
  }

  // Xử lý chỉnh sửa
  const handleEdit = (record) => {
    const updatedUsers = users.map((user) =>
      user.id === record.id ? record : user
    )
    setUsers(updatedUsers)
  }

  // Xử lý xóa
  const handleDelete = (record) => {
    const updatedUsers = users.filter((user) => user.id !== record.id)
    setUsers(updatedUsers)
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Quản lý người dùng</h1>

      <BaseTable
        data={users}
        config={tableConfig}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
        formComponent={<UserForm />}
      />
    </div>
  )
}

export default SamplePage
