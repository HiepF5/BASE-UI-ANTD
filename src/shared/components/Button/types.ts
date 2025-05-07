import type { ButtonProps } from "antd"
import type React from "react"

export type ButtonBaseType = "primary" | "link" | "text" | "default" | "dashed"
export type ButtonBaseSize = "large" | "middle" | "small"

export interface ButtonBaseProps extends ButtonProps {
  children?: React.ReactNode
  type?: ButtonBaseType
  size?: ButtonBaseSize
  block?: boolean
  className?: string
  style?: React.CSSProperties
}
