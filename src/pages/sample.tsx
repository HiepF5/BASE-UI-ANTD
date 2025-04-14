const SamplePage = () => {
  // Data và state...

  // Config cho table với multi-form
  const tableConfigWithMultiForm = {
    ...tableConfig,
    modal: {
      width: 800,
      centered: true,
      form: {
        type: 'steps', // hoặc 'tabs'
        forms: [
          {
            key: 'basicInfo',
            title: 'Thông tin cơ bản',
            component: 'UserBasicForm',
            icon: 'UserOutlined',
            required: true
          },
          {
            key: 'contactInfo',
            title: 'Thông tin liên hệ',
            component: 'UserContactForm',
            icon: 'PhoneOutlined'
          },
          {
            key: 'advancedInfo',
            title: 'Thông tin nâng cao',
            component: 'UserAdvancedForm',
            icon: 'SettingOutlined',
            visibleWhen: (formData) =>
              formData.basicInfo && formData.basicInfo.type === 'admin'
          }
        ],
        actions: {
          showPrevious: true,
          showNext: true,
          previousText: 'Quay lại',
          nextText: 'Tiếp theo',
          finishText: 'Hoàn thành',
          cancelText: 'Hủy'
        },
        validation: {
          validateOnNext: true,
          validateAll: true
        }
      }
    }
  }

  // Form components
  const formComponents = {
    UserBasicForm: <UserBasicForm />,
    UserContactForm: <UserContactForm />,
    UserAdvancedForm: <UserAdvancedForm />
  }

  // Xử lý thêm mới với multi-form
  const handleAdd = (values) => {
    // Giả lập thêm mới user với dữ liệu từ nhiều form
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      // Tích hợp dữ liệu từ các form
      name: values.basicInfo.name,
      email: values.basicInfo.email,
      type: values.basicInfo.type,
      phone: values.contactInfo?.phone,
      address: values.contactInfo?.address,
      permissions: values.advancedInfo?.permissions,
      department: values.advancedInfo?.department,
      status: 'Hoạt động',
      createdAt: new Date().toISOString().split('T')[0]
    }

    setUsers([...users, newUser])
  }

  // Tương tự cho handleEdit...

  return (
    <div style={{ padding: 24 }}>
      <h1>Quản lý người dùng</h1>

      <BaseTable
        data={users}
        config={tableConfigWithMultiForm}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
        multiFormComponents={formComponents}
      />
    </div>
  )
}
