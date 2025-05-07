// types.ts
import type { SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";
import type React from "react";

export type SelectOption = {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
  children?: SelectOption[];
};

export interface SelectBaseProps extends SelectProps {
  options?: SelectOption[];
  allowClear?: boolean;
  showSearch?: boolean;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  filterOption?: boolean | ((inputValue: string, option: DefaultOptionType | undefined) => boolean);
}
