import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Avances from './Avances';

describe('Test de Avances', () => {
    test('renders content', () => {
        const component = render();
        expect(component.container).not.toBeNull();
    });
});