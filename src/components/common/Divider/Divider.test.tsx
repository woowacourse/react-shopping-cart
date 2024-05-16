import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Divider from './Divider';

describe('Divider 컴포넌트', () => {
  test('Divider가 올바르게 렌더링된다', () => {
    const { container } = render(<Divider />);
    const dividerElement = container.firstChild;
    expect(dividerElement).toBeInTheDocument();
  });

  test('Divider의 스타일이 올바르게 적용된다', () => {
    const { container } = render(<Divider />);
    const dividerElement = container.firstChild;
    expect(dividerElement).toHaveStyle(`
      height: 1px;
      width: 100%;
      background-color: #00000019;
    `);
  });
});
