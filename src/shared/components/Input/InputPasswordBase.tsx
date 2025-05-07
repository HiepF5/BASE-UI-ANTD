import React, { forwardRef } from 'react'
import { Input } from 'antd'
import type { BaseInputProps } from './types'

const InputPasswordBase = forwardRef<React.ComponentRef<typeof Input>, BaseInputProps>((props, ref) => (
  <Input.Password ref={ref} allowClear {...props} />
))

InputPasswordBase.displayName = 'InputPasswordBase'

export default InputPasswordBase
