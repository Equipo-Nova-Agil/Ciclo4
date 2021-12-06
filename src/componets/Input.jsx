import React from 'react';

const Input = ({ label, name, defaultValue, type, required, placeholder, className, onChange, value }) => {
  return (
    <label htmlFor={name} >
      <span>{label}</span>
      <input
        required={required}
        type={type}
        name={name}
        placeholder={placeholder}
        className={className}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
