import React from 'react';

const Input = ({ label, name, defaultValue, type, required, placeholder, className }) => {
  return (
    <label htmlFor={name} >
      <span>{label}</span>
      <input
        required={required}
        type={type}
        name={name}
        placeholder={placeholder}
        className={className}
        defaultValue={defaultValue}
      />
    </label>
  );
};

export default Input;
