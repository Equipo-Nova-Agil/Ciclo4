import React from 'react';
import ButtonLoading from './ButtonLoading.jsx';
import { render, screen } from '@testing-library/react';

  
  it('loads the svg html when loading is activated', () => {
    render(<ButtonLoading text='hola' loading={true} disabled={false} />);
    expect(screen.getByTestId('button-loading')).toMatchSnapshot();
  });