import type React from "react"
import type { FormInstance } from "antd"
import BaseForm from "../../shared/components/Form/FormBase"
export interface UserFormSectionProps {
  form: FormInstance
  initialValues?: Record<string, any>
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
  onValuesChange?: (changedValues: any, allValues: any) => void
}

const UserFormSection: React.FC<UserFormSectionProps> = ({
  form,
  initialValues,
  disabled = false,
  className = "",
  style = {},
  children,
  onValuesChange,
  ...rest
}) => {
  return (
    <BaseForm
      form={form}
      initialValues={initialValues}
      disabled={disabled}
      className={className}
      style={style}
      onValuesChange={onValuesChange}
      {...rest}
    >
      {children}
    </BaseForm>
  )
}

export default UserFormSection
