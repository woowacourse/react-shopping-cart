import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Spacer from './Spacer';

describe('Spacer 컴포넌트', () => {
  test('height 속성을 올바르게 적용한다', () => {
    const { container } = render(<Spacer height={50} />);
    const spacerElement = container.firstChild;
    expect(spacerElement).toHaveStyle('height: 50px');
    expect(spacerElement).toHaveStyle('width: 100%');
  });

  test('다른 height 값을 올바르게 적용한다', () => {
    const { container } = render(<Spacer height={100} />);
    const spacerElement = container.firstChild;
    expect(spacerElement).toHaveStyle('height: 100px');
  });
});
