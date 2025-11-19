import { type HTMLInputTypeAttribute } from 'react';
import './InputField.css';

type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  onChange: (value: string) => void;
};

const InputField = ({
  label,
  name,
  value,
  placeholder,
  type = 'text',
  onChange,
}: InputFieldProps) => {
  return (
    <label className="input-field">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

export default InputField;

