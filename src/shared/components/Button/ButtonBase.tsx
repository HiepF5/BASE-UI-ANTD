import React, { forwardRef } from 'react'
import { Button } from 'antd'
import type { ButtonBaseProps } from './types'

const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (
    {
      children,
      type = 'primary',
      size = 'middle',
      icon = null,
      disabled = false,
      loading = false,
      onClick,
      className = '',
      style = {},
      block = false,
      ...rest
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        type={type}
        size={size}
        icon={icon}
        disabled={disabled}
        loading={loading}
        onClick={onClick}
        className={className}
        style={style}
        block={block}
        {...rest}
      >
        {children}
      </Button>
    )
  }
)

ButtonBase.displayName = 'ButtonBase'

export default ButtonBase
