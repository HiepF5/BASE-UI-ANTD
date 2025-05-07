"use client"

import type React from "react"
import { useState } from "react"
import { Form, Card, message, Space } from "antd"
import UserForm from "./UserForm"
import BaseButton from "../../shared/components/Button"
const UserFormExample: React.FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [useTabs, setUseTabs] = useState(true)
  const [showAdvanced, setShowAdvanced] = useState(true)
  const [showAddressDetails, setShowAddressDetails] = useState(false)

  // Sample initial values
  const initialValues = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    type: "user",
    phone: "0987654321",
    address: "Hà Nội, Việt Nam",
    permissions: ["view", "add"],
    department: "tech",
  }

  const handleFinish = (values: any) => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Form values:", values)
      message.success("Lưu thông tin thành công!")
      setLoading(false)
    }, 1000)
  }

  const handleReset = () => {
    form.resetFields()
    message.info("Đã xóa tất cả thông tin!")
  }

  return (
    <div className="p-4">
      <Card title="Quản lý người dùng" className="mb-4">
        <Space className="mb-4">
          <BaseButton type="default" onClick={() => setUseTabs(!useTabs)}>
            {useTabs ? "Hiển thị dạng danh sách" : "Hiển thị dạng tab"}
          </BaseButton>

          <BaseButton type="default" onClick={() => setShowAdvanced(!showAdvanced)}>
            {showAdvanced ? "Ẩn thông tin nâng cao" : "Hiện thông tin nâng cao"}
          </BaseButton>

          <BaseButton type="default" onClick={() => setShowAddressDetails(!showAddressDetails)}>
            {showAddressDetails ? "Ẩn chi tiết địa chỉ" : "Hiện chi tiết địa chỉ"}
          </BaseButton>
        </Space>

        <UserForm
          form={form}
          initialValues={initialValues}
          onFinish={handleFinish}
          showAdvancedTab={showAdvanced}
          showAddressDetails={showAddressDetails}
          useTabs={useTabs}
          showRoleField={true}
          userTypeOptions={[
            { label: "Người dùng", value: "user" },
            { label: "Quản trị viên", value: "admin" },
            { label: "Khách", value: "guest" },
          ]}
        />

        <div className="mt-4 flex justify-end space-x-2">
          <BaseButton type="default" onClick={handleReset}>
            Xóa
          </BaseButton>
          <BaseButton type="primary" onClick={() => form.submit()} loading={loading}>
            Lưu
          </BaseButton>
        </div>
      </Card>
    </div>
  )
}

export default UserFormExample
