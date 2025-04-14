// UserManagementPage.tsx
import React from 'react'
import BaseTable from '../shared/components/Table/BaseTable'
import UserFormWithFakeData from './UserFormWithFakeData' // Form đã chuẩn bị
import { Card } from 'antd'

const mockData = [
  {
    key: '1',
    name: 'Nguyễn Văn A',
    email: 'a@example.com',
    type: 'admin',
    status: 'Hoạt động',
    phone: '0912345678',
    address: 'HCM',
    permissions: ['view', 'add'],
    department: 'tech'
  },
  {
    key: '2',
    name: 'Trần Thị B',
    email: 'b@example.com',
    type: 'user',
    status: 'Không hoạt động',
    phone: '0987654321',
    address: 'HN',
    permissions: ['view'],
    department: 'hr'
  }
]

const columns = [
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Họ tên'
  },
  {
    key: 'email',
    dataIndex: 'email',
    title: 'Email'
  },
  {
    key: 'type',
    dataIndex: 'type',
    title: 'Loại tài khoản'
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: 'Trạng thái'
  },
  {
    key: 'department',
    dataIndex: 'department',
    title: 'Phòng ban'
  }
]

const UserManagementPage: React.FC = () => {
  const handleAdd = (record: any) => {
    console.log('🟢 Thêm mới:', record)
  }

  const handleEdit = (record: any) => {
    console.log('🟡 Cập nhật:', record)
  }

  const handleDelete = (record: any) => {
    console.log('🔴 Xóa:', record)
  }

  return (
    <Card title='Quản lý người dùng'>
      <BaseTable
        data={mockData}
        config={{
          columns,
          columnSettings: {
            showSelector: true,
            draggable: true,
            defaultVisible: ['name', 'email', 'type', 'status'],
            storage: { enabled: false, key: 'user-columns' }
          },
          modal: {
            type: 'single',
            form: {
              type: 'single',
              actions: {
                cancelText: 'Huỷ',
                finishText: 'Lưu'
              }
            }
          }
        }}
        userRole='admin'
        formComponent={<UserFormWithFakeData />}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Card>
  )
}

export default UserManagementPage
