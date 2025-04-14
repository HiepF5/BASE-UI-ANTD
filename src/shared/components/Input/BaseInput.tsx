import React from 'react';
import { Input, InputProps } from 'antd';

interface BaseInputProps extends InputProps {}

const BaseInput: React.FC<BaseInputProps> = (props) => {
  return <Input {...props} />;
};

export default BaseInput; 