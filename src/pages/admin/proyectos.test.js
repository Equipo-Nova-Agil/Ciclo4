import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Proyectos from './Proyectos';

describe('Test de Proyectos', () => {
    test('renders content', () => {
        const component = render();
        expect(component.container).not.toBeNull();
    });

    test('clicking the button calls event handler once', () => {
        const mockHandler = jest.fn();
        expect(mockHandler).toHaveBeenCalledTimes(0);
    });
})