import React, { forwardRef } from 'react'
import { Input } from 'antd'
import  { TextAreaProps }  from 'antd/es/input'

const InputTextAreaBase = forwardRef<
  React.ComponentRef<typeof Input.TextArea>,
  TextAreaProps
>(({ rows = 4, ...props }, ref) => {
  return <Input.TextArea ref={ref} rows={rows} allowClear {...props} />
})

InputTextAreaBase.displayName = 'InputTextAreaBase'

export default InputTextAreaBase
