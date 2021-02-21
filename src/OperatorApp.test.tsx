import React from 'react';
import { render, screen } from '@testing-library/react';
import OperatorApp from './OperatorApp';

test('renders learn react link', () => {
  render(<OperatorApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
