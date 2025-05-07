import type React from "react"
import type { FormInstance } from "antd"
import UserFormSection from "./UserFormSection"
import FormItem from "../../shared/components/Form/FormItemBase"
import BaseSelect  from "../../shared/components/Select"

export interface UserAdvancedFormProps {
  form: FormInstance
  initialValues?: Record<string, any>
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  onValuesChange?: (changedValues: any, allValues: any) => void
  permissionOptions?: { label: string; value: string }[]
  departmentOptions?: { label: string; value: string }[]
  showRoleField?: boolean
}

const UserAdvancedForm: React.FC<UserAdvancedFormProps> = ({
  form,
  initialValues,
  disabled = false,
  className = "",
  style = {},
  onValuesChange,
  permissionOptions = [
    { label: "Xem", value: "view" },
    { label: "Thêm", value: "add" },
    { label: "Sửa", value: "edit" },
    { label: "Xóa", value: "delete" },
  ],
  departmentOptions = [
    { label: "Kỹ thuật", value: "tech" },
    { label: "Kinh doanh", value: "business" },
    { label: "Nhân sự", value: "hr" },
  ],
  showRoleField = false,
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
      <FormItem name="permissions" label="Quyền hạn" tooltip="Các quyền hạn của người dùng trong hệ thống">
        <BaseSelect mode="multiple" options={permissionOptions} placeholder="Chọn quyền hạn" />
      </FormItem>

      <FormItem name="department" label="Phòng ban" tooltip="Phòng ban mà người dùng thuộc về">
        <BaseSelect options={departmentOptions} placeholder="Chọn phòng ban" />
      </FormItem>

      {showRoleField && (
        <FormItem name="role" label="Vai trò" tooltip="Vai trò của người dùng trong tổ chức">
          <BaseSelect
            options={[
              { label: "Nhân viên", value: "employee" },
              { label: "Quản lý", value: "manager" },
              { label: "Giám đốc", value: "director" },
            ]}
            placeholder="Chọn vai trò"
          />
        </FormItem>
      )}
    </UserFormSection>
  )
}

export default UserAdvancedForm
