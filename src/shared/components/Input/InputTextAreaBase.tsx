import React, { forwardRef } from 'react'
import { Input } from 'antd'
import type { BaseInputProps } from './types'
import  { TextAreaProps }  from 'antd/es/input'

const InputTextAreaBase = forwardRef<
  React.ComponentRef<typeof Input.TextArea>,
  BaseInputProps
>(({ rows = 4, ...props }, ref) => {
  return <Input.TextArea ref={ref} rows={rows} allowClear {...(props as TextAreaProps)} />
})

InputTextAreaBase.displayName = 'InputTextAreaBase'

export default InputTextAreaBase
