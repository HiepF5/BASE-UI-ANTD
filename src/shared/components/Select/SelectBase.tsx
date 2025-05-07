// SelectBase.tsx
'use client'

import React, { forwardRef } from 'react'
import { Select } from 'antd'
import { SelectBaseProps } from './types'


const SelectBase = forwardRef<React.ComponentRef<typeof Select>, SelectBaseProps>(
  (
    {
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
      allowClear = true,
      showSearch = true,
      filterOption = true,
      ...rest
    },
    ref
  ) => {
    // Default filter function that searches by label
    const defaultFilterOption = (input: string, option: { label?: React.ReactNode } | undefined) => {
      const label = typeof option?.label === 'string' ? option.label : '';
      return label.toLowerCase().includes(input.toLowerCase());
    }

    const finalFilterOption =
      filterOption === true
        ? defaultFilterOption
        : filterOption === false
          ? undefined
          : filterOption

    return (
      <Select
        ref={ref}
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
        filterOption={finalFilterOption}
        {...rest}
      />
    )
  }
)

SelectBase.displayName = 'SelectBase'

export default SelectBase
