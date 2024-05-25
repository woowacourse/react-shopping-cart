import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MobileLayout from './MobileLayout';

describe('MobileLayout 컴포넌트', () => {
  test('children을 올바르게 렌더링한다', () => {
    render(
      <MobileLayout>
        <div>Test Child</div>
      </MobileLayout>,
    );
    const childElement = screen.getByText('Test Child');
    expect(childElement).toBeInTheDocument();
  });

  test('Background 스타일이 올바르게 적용된다', () => {
    render(
      <MobileLayout>
        <div>Test Child</div>
      </MobileLayout>,
    );
    const backgroundElement = screen.getByText('Test Child').parentElement?.parentElement;
    expect(backgroundElement).toHaveStyle('width: 100%');
    expect(backgroundElement).toHaveStyle('display: flex');
    expect(backgroundElement).toHaveStyle('justify-content: center');
    expect(backgroundElement).toHaveStyle('background-color: lightGray');
  });
});
