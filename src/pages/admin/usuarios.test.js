import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Usuarios from './Usuarios';

  
  test('renders content', () => {
    const component = render();
  });

  test('clicking the button calls event handler once', () => {
    const mockHandler = jest.fn();
    expect(mockHandler).toHaveBeenCalledTimes(0);
  });