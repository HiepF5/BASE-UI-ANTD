import type { InputProps } from "antd"
import type React from "react"

export interface BaseInputProps extends InputProps {
  allowClear?: boolean
  bordered?: boolean
  className?: string
  style?: React.CSSProperties
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  size?: "large" | "middle" | "small"
  disabled?: boolean
  rows?: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
}
