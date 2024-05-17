import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Title from './Title';

describe('Title 컴포넌트', () => {
  test('title을 올바르게 렌더링한다', () => {
    render(<Title title="Test Title" />);
    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('P');
  });

  test('description을 올바르게 렌더링한다', () => {
    render(<Title title="Test Title" description="Test Description" />);
    const descriptionElement = screen.getByText('Test Description');
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement.tagName).toBe('P');
  });

  test('description이 없는 경우 description 요소가 렌더링되지 않는다', () => {
    render(<Title title="Test Title" />);
    const descriptionElement = screen.queryByText('Test Description');
    expect(descriptionElement).not.toBeInTheDocument();
  });
});
