import React, { ReactNode } from 'react'
import { Button, ButtonProps } from 'antd'

interface BaseButtonProps extends ButtonProps {
  children?: ReactNode;
  type?: 'primary' | 'link' | 'text' | 'default' | 'dashed';
  size?: 'large' | 'middle' | 'small';
}

const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  type = 'primary',
  size = 'middle',
  icon = null,
  disabled = false,
  loading = false,
  onClick,
  className = '',
  style = {},
  ...rest
}) => {
  return (
    <Button
      type={type}
      size={size}
      icon={icon}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Button>
  )
}

export default BaseButton