import React from 'react'
import { Form, Input, Select } from 'antd'
import BaseInput from '../Input/BaseInput'
import BaseSelect from '../Select/BaseSelect'

interface UserFormProps {
  form: any; // Replace 'any' with the appropriate type if available
  initialValues: { name?: string; email?: string; status?: string }; // Adjust fields as per your actual data structure
  disabled?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ form, initialValues, disabled = false }) => {
  const statusOptions = [
    { label: 'Hoạt động', value: 'Hoạt động' },
    { label: 'Không hoạt động', value: 'Không hoạt động' }
  ]

  return (
    <Form
      form={form}
      layout='vertical'
      initialValues={initialValues}
      disabled={disabled}
    >
      <Form.Item
        name='name'
        label='Họ tên'
        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
      >
        <BaseInput placeholder='Nhập họ tên' />
      </Form.Item>

      <Form.Item
        name='email'
        label='Email'
        rules={[
          { required: true, message: 'Vui lòng nhập email!' },
          { type: 'email', message: 'Email không đúng định dạng!' }
        ]}
      >
        <BaseInput placeholder='Nhập email' />
      </Form.Item>

      <Form.Item
        name='status'
        label='Trạng thái'
        rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
      >
        <BaseSelect options={statusOptions} placeholder='Chọn trạng thái' />
      </Form.Item>
    </Form>
  )
}

export default UserForm
