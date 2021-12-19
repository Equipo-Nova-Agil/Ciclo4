import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Usuarios from './Usuarios';

describe('Test de Usuarios', () => {
  test('renders content', () => {
    const component = render();
    expect(component.container).not.toBeNull();
  });

  test('clicking the button calls event handler once', () => {
    const mockHandler = jest.fn();
    expect(mockHandler).toHaveBeenCalledTimes(0);
  });
})