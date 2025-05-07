import React, { forwardRef } from 'react'
import { Input } from 'antd'
import type { BaseInputProps } from './types'

const InputBase = forwardRef<React.ComponentRef<typeof Input>, BaseInputProps>(
  (
    {
      placeholder,
      size = 'middle',
      disabled = false,
      allowClear = true,
      bordered = true,
      className = '',
      style = {},
      ...rest
    },
    ref
  ) => {
    return (
      <Input
        ref={ref}
        placeholder={placeholder}
        size={size}
        disabled={disabled}
        allowClear={allowClear}
        bordered={bordered}
        className={className}
        style={style}
        {...rest}
      />
    )
  }
)

InputBase.displayName = 'InputBase'

export default InputBase
