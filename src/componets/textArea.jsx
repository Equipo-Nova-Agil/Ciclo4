import React from 'react';

const textArea = ({ label, name, rows, cols, required, placeholder, className, value, defaultValue }) => {
  return (
    <label htmlFor={name} >
      <span>{label}</span>
      <textarea
        required={required}
        rows={rows}
        cols={cols}
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={className}
      />
    </label>
  );
};

export default textArea;
