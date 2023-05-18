import { render, screen } from '@testing-library/react';
import Logo from './Logo';
import { BrowserRouter } from 'react-router-dom';
test('Renders main element', () => {
  render(
    <BrowserRouter>
      <Logo />
    </BrowserRouter>
  );
  const mainElement = screen.getByRole('button');
  expect(mainElement).toBeInTheDocument();
});
