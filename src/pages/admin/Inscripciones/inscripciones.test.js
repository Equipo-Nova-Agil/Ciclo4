import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import InscriptionRow from './InscriptionRow';

describe('Test de Inscripciones', () => {
    test('renders content', () => {
        const component = render();
        expect(component.container).not.toBeNull();
    });
});