import React from 'react'
import { Select, SelectProps } from 'antd'

interface BaseSelectProps extends SelectProps {
  options?: { label: string; value: string | number }[];
}

const BaseSelect: React.FC<BaseSelectProps> = ({
  options = [],
  placeholder = 'Chọn...',
  size = 'middle',
  disabled = false,
  loading = false,
  mode,
  value,
  onChange,
  className = '',
  style = {},
  allowClear = false,
  showSearch = false,
  filterOption,
  ...rest
}) => {
  return (
    <Select
      options={options}
      placeholder={placeholder}
      size={size}
      disabled={disabled}
      loading={loading}
      mode={mode}
      value={value}
      onChange={onChange}
      className={className}
      style={style}
      allowClear={allowClear}
      showSearch={showSearch}
      filterOption={
        filterOption ||
        ((input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase()))
      }
      {...rest}
    />
  )
}

export default BaseSelect
