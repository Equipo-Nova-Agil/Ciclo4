import React from 'react';

const textArea = ({ label, name, rows, cols, required, placeholder, className }) => {
  return (
    <label htmlFor={name} >
      <span>{label}</span>
      <textarea
        required={required}
        rows={rows}
        cols={cols}
        name={name}
        placeholder={placeholder}
        className={className}
      />
    </label>
  );
};

export default textArea;
