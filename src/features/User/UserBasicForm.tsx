import type React from "react"
import type { FormInstance } from "antd"
import UserFormSection from "./UserFormSection"
import FormItem from "../../shared/components/Form/FormItemBase"
import BaseInput  from "../../shared/components/Input/InputBase"
import BaseSelect  from "../../shared/components/Select"
export interface UserBasicFormProps {
  form: FormInstance
  initialValues?: Record<string, any>
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  onValuesChange?: (changedValues: any, allValues: any) => void
  userTypeOptions?: { label: string; value: string }[]
}

const UserBasicForm: React.FC<UserBasicFormProps> = ({
  form,
  initialValues,
  disabled = false,
  className = "",
  style = {},
  onValuesChange,
  userTypeOptions = [
    { label: "Người dùng", value: "user" },
    { label: "Quản trị viên", value: "admin" },
  ],
  ...rest
}) => {
  return (
    <UserFormSection
      form={form}
      initialValues={initialValues}
      disabled={disabled}
      className={className}
      style={style}
      onValuesChange={onValuesChange}
      {...rest}
    >
      <FormItem name="name" label="Họ tên" required tooltip="Tên đầy đủ của người dùng">
        <BaseInput placeholder="Nhập họ tên" />
      </FormItem>

      <FormItem
        name="email"
        label="Email"
        required
        rules={[{ type: "email", message: "Email không đúng định dạng!" }]}
        tooltip="Email dùng để đăng nhập và liên hệ"
      >
        <BaseInput placeholder="Nhập email" />
      </FormItem>

      <FormItem name="type" label="Loại tài khoản" required tooltip="Quyết định vai trò và quyền hạn của người dùng">
        <BaseSelect options={userTypeOptions} placeholder="Chọn loại tài khoản" />
      </FormItem>
    </UserFormSection>
  )
}

export default UserBasicForm
