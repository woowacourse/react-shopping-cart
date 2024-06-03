import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '../../theme';
import { ReactElement, ReactNode } from 'react';
import { DefaultTheme } from 'styled-components/dist/types';

interface WrapperProps {
  children: ReactNode;
}
const Wrapper = ({ children }: WrapperProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const renderWithStyledComponent = (ui: ReactElement, options?: DefaultTheme) =>
  render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';

export { renderWithStyledComponent as render };
