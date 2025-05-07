import type React from "react"
import { Form } from "antd"
import { FormItemProps } from "./types"

const FormItem: React.FC<FormItemProps> = ({
  children,
  label,
  name,
  rules = [],
  tooltip,
  required = false,
  className = "",
  style = {},
  ...rest
}) => {
  // Add required rule if specified
  const finalRules = required ? [{ required: true, message: `Vui lòng nhập ${label}!` }, ...rules] : rules

  return (
    <Form.Item
      label={label}
      name={name}
      rules={finalRules}
      tooltip={tooltip}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Form.Item>
  )
}

export default FormItem
