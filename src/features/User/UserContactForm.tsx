import type React from "react"
import type { FormInstance } from "antd"
import UserFormSection from "./UserFormSection"
import FormItem from "../../shared/components/Form/FormItemBase"
import BaseInput  from "../../shared/components/Input/InputBase"
import BaseTextArea  from "../../shared/components/Input/InputTextAreaBase"


export interface UserContactFormProps {
  form: FormInstance
  initialValues?: Record<string, any>
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  onValuesChange?: (changedValues: any, allValues: any) => void
  showAddressDetails?: boolean
}

const UserContactForm: React.FC<UserContactFormProps> = ({
  form,
  initialValues,
  disabled = false,
  className = "",
  style = {},
  onValuesChange,
  showAddressDetails = false,
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
      <FormItem
        name="phone"
        label="Số điện thoại"
        required
        rules={[
          {
            pattern: /^[0-9]{10,11}$/,
            message: "Số điện thoại không hợp lệ!",
          },
        ]}
        tooltip="Số điện thoại liên hệ"
      >
        <BaseInput placeholder="Nhập số điện thoại" />
      </FormItem>

      <FormItem name="address" label="Địa chỉ" tooltip="Địa chỉ liên hệ">
        <BaseTextArea placeholder="Nhập địa chỉ" rows={3} />
      </FormItem>

      {showAddressDetails && (
        <>
          <FormItem name="city" label="Thành phố">
            <BaseInput placeholder="Nhập thành phố" />
          </FormItem>

          <FormItem name="district" label="Quận/Huyện">
            <BaseInput placeholder="Nhập quận/huyện" />
          </FormItem>
        </>
      )}
    </UserFormSection>
  )
}

export default UserContactForm
