// UserBasicForm.jsx
import React from 'react';
import { Form, FormInstance } from 'antd';
import BaseInput from '../Input/InputBase';
import BaseSelect from '../Select/SelectBase';

interface FormProps {
  form: FormInstance;
  initialValues?: Record<string, any>;
  disabled?: boolean;
  formData?: Record<string, any>;
}

const UserBasicForm: React.FC<FormProps> = ({ form, initialValues, disabled, formData }) => {
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
    </Form>
  )
}

// UserContactForm.jsx
const UserContactForm: React.FC<FormProps> = ({ form, initialValues, disabled, formData }) => {
  return (
    <Form
      form={form}
      layout='vertical'
      initialValues={initialValues}
      disabled={disabled}
    >
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
    </Form>
  )
}

// UserAdvancedForm.jsx (chỉ hiển thị với admin)
const UserAdvancedForm: React.FC<FormProps> = ({ form, initialValues, disabled, formData }) => {
  return (
    <Form
      form={form}
      layout='vertical'
      initialValues={initialValues}
      disabled={disabled}
    >
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
    </Form>
  )
}

export { UserBasicForm, UserContactForm, UserAdvancedForm }
