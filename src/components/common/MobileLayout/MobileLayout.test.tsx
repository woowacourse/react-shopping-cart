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

  test('LimitedWidthContainer 스타일이 올바르게 적용된다', () => {
    render(
      <MobileLayout>
        <div>Test Child</div>
      </MobileLayout>,
    );
    const containerElement = screen.getByText('Test Child').parentElement;
    expect(containerElement).toHaveStyle('position: relative');
    expect(containerElement).toHaveStyle('width: 430px');
    expect(containerElement).toHaveStyle('height: 100vh');
    expect(containerElement).toHaveStyle('margin: 0 auto');
    expect(containerElement).toHaveStyle('display: flex');
    expect(containerElement).toHaveStyle('flex-direction: column');
    expect(containerElement).toHaveStyle('align-items: center');
    expect(containerElement).toHaveStyle('background-color: white');
    expect(containerElement).toHaveStyle('overflow: scroll');
  });
});
