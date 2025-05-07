import { forwardRef } from "react"
import { Form, FormInstance } from "antd"
import { BaseFormProps } from "./types"

const BaseForm = forwardRef<FormInstance, BaseFormProps>(
  (
    {
      children,
      form,
      initialValues,
      disabled = false,
      layout = "vertical",
      className = "",
      style = {},
      onFinish,
      onFinishFailed,
      ...rest
    },
    ref,
  ) => {
    return (
      <Form
        ref={ref}
        form={form}
        layout={layout}
        initialValues={initialValues}
        disabled={disabled}
        className={className}
        style={style}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...rest}
      >
        {children}
      </Form>
    )
  },
)

BaseForm.displayName = "BaseForm"

export default BaseForm
