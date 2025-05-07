import { type FormProps as AntdFormProps, type FormInstance } from "antd"
import { type FormItemProps as AntdFormItemProps } from "antd"

export interface BaseFormProps extends AntdFormProps {
  children: React.ReactNode
  form?: FormInstance
  initialValues?: Record<string, any>
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  onFinish?: (values: any) => void
  onFinishFailed?: (errorInfo: any) => void
}

export interface FormItemProps extends AntdFormItemProps {
  children: React.ReactNode
  tooltip?: React.ReactNode
  required?: boolean
  className?: string
  style?: React.CSSProperties
}
