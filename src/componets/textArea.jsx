import React from 'react';

const textArea = ({ label, name, rows, cols, required, placeholder, className, value }) => {
  return (
    <label htmlFor={name} >
      <span>{label}</span>
      <textarea
        required={required}
        rows={rows}
        cols={cols}
        name={name}
        value={value}
        placeholder={placeholder}
        className={className}
      />
    </label>
  );
};

export default textArea;
