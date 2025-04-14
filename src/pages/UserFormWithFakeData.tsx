import React from 'react'
import { Form } from 'antd'
import BaseInput from '../shared/components/Input/BaseInput'
import BaseSelect from '../shared/components/Select/BaseSelect'
import BaseButton from '../shared/components/Button/BaseButton'

const UserFormWithFakeData: React.FC = () => {
  const [form] = Form.useForm()

  const initialValues = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    type: 'admin',
    status: 'Hoạt động',
    phone: '0912345678',
    address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
    permissions: ['view', 'add'],
    department: 'business'
  }

  const handleFinish = (values: any) => {
    console.log('Submitted values:', values)
  }

  return (
    <Form
      form={form}
      layout='vertical'
      initialValues={initialValues}
      onFinish={handleFinish}
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
        name='type'
        label='Loại tài khoản'
        rules={[{ required: true, message: 'Vui lòng chọn loại tài khoản!' }]}
      >
        <BaseSelect
          options={[
            { label: 'Người dùng', value: 'user' },
            { label: 'Quản trị viên', value: 'admin' }
          ]}
          placeholder='Chọn loại tài khoản'
        />
      </Form.Item>

      <Form.Item
        name='status'
        label='Trạng thái'
        rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
      >
        <BaseSelect
          options={[
            { label: 'Hoạt động', value: 'Hoạt động' },
            { label: 'Không hoạt động', value: 'Không hoạt động' }
          ]}
          placeholder='Chọn trạng thái'
        />
      </Form.Item>

      <Form.Item
        name='phone'
        label='Số điện thoại'
        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
      >
        <BaseInput placeholder='Nhập số điện thoại' />
      </Form.Item>

      <Form.Item name='address' label='Địa chỉ'>
        <BaseInput placeholder='Nhập địa chỉ' />
      </Form.Item>

      <Form.Item name='permissions' label='Quyền hạn'>
        <BaseSelect
          mode='multiple'
          options={[
            { label: 'Xem', value: 'view' },
            { label: 'Thêm', value: 'add' },
            { label: 'Sửa', value: 'edit' },
            { label: 'Xóa', value: 'delete' }
          ]}
          placeholder='Chọn quyền hạn'
        />
      </Form.Item>

      <Form.Item name='department' label='Phòng ban'>
        <BaseSelect
          options={[
            { label: 'Kỹ thuật', value: 'tech' },
            { label: 'Kinh doanh', value: 'business' },
            { label: 'Nhân sự', value: 'hr' }
          ]}
          placeholder='Chọn phòng ban'
        />
      </Form.Item>

      <Form.Item>
        <BaseButton type='primary' htmlType='submit'>
          Lưu
        </BaseButton>
        <BaseButton
          type='default'
          style={{ marginLeft: 8 }}
          onClick={() => form.resetFields()}
        >
          Huỷ
        </BaseButton>
      </Form.Item>
    </Form>
  )
}

export default UserFormWithFakeData
