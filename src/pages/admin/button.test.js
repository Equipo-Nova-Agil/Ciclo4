import React from 'react';
import ButtonLoading from './ButtonLoading.jsx';
import { render, screen } from '@testing-library/react';
it('renders okay', () => {
    render(<ButtonLoading text='hola' loading={false} disabled={false} />);
    expect(screen.getByTestId('button-loading')).toBeInTheDocument();
});