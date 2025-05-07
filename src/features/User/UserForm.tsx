"use client"

import type React from "react"
import { useState } from "react"
import { Form, type FormInstance, Tabs, type TabsProps } from "antd"
import UserBasicForm from "./UserBasicForm"
import UserContactForm from "./UserContactForm"
import UserAdvancedForm from "./UserAdvancedForm"

export interface UserFormProps {
  initialValues?: Record<string, any>
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  onValuesChange?: (changedValues: any, allValues: any) => void
  onFinish?: (values: any) => void
  showAdvancedTab?: boolean
  form?: FormInstance
  userTypeOptions?: { label: string; value: string }[]
  permissionOptions?: { label: string; value: string }[]
  departmentOptions?: { label: string; value: string }[]
  showAddressDetails?: boolean
  showRoleField?: boolean
  useTabs?: boolean
}

const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  disabled = false,
  className = "",
  style = {},
  onValuesChange,
  onFinish,
  showAdvancedTab = true,
  form: externalForm,
  userTypeOptions,
  permissionOptions,
  departmentOptions,
  showAddressDetails = false,
  showRoleField = false,
  useTabs = true,
  ...rest
}) => {
  // Use provided form or create a new one
  const [internalForm] = Form.useForm()
  const form = externalForm || internalForm

  // For tabs
  const [activeTab, setActiveTab] = useState<string>("basic")

  // Handle form submission
  const handleFinish = (values: any) => {
    if (onFinish) {
      onFinish(values)
    }
  }

  // Define tabs
  const items: TabsProps["items"] = [
    {
      key: "basic",
      label: "Thông tin cơ bản",
      children: (
        <UserBasicForm
          form={form}
          initialValues={initialValues}
          disabled={disabled}
          onValuesChange={onValuesChange}
          userTypeOptions={userTypeOptions}
        />
      ),
    },
    {
      key: "contact",
      label: "Thông tin liên hệ",
      children: (
        <UserContactForm
          form={form}
          initialValues={initialValues}
          disabled={disabled}
          onValuesChange={onValuesChange}
          showAddressDetails={showAddressDetails}
        />
      ),
    },
  ]

  // Add advanced tab if needed
  if (showAdvancedTab) {
    items.push({
      key: "advanced",
      label: "Thông tin nâng cao",
      children: (
        <UserAdvancedForm
          form={form}
          initialValues={initialValues}
          disabled={disabled}
          onValuesChange={onValuesChange}
          permissionOptions={permissionOptions}
          departmentOptions={departmentOptions}
          showRoleField={showRoleField}
        />
      ),
    })
  }

  // If not using tabs, render all forms directly
  if (!useTabs) {
    return (
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        disabled={disabled}
        className={className}
        style={style}
        onValuesChange={onValuesChange}
        onFinish={handleFinish}
        {...rest}
      >
        <div className="mb-6">
          <UserBasicForm
            form={form}
            initialValues={initialValues}
            disabled={disabled}
            onValuesChange={onValuesChange}
            userTypeOptions={userTypeOptions}
          />
        </div>

        <div className="mb-6">
          <UserContactForm
            form={form}
            initialValues={initialValues}
            disabled={disabled}
            onValuesChange={onValuesChange}
            showAddressDetails={showAddressDetails}
          />
        </div>

        {showAdvancedTab && (
          <div>
            <UserAdvancedForm
              form={form}
              initialValues={initialValues}
              disabled={disabled}
              onValuesChange={onValuesChange}
              permissionOptions={permissionOptions}
              departmentOptions={departmentOptions}
              showRoleField={showRoleField}
            />
          </div>
        )}
      </Form>
    )
  }

  // Render with tabs
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      disabled={disabled}
      className={className}
      style={style}
      onValuesChange={onValuesChange}
      onFinish={handleFinish}
      {...rest}
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} className="user-form-tabs" />
    </Form>
  )
}

export default UserForm
