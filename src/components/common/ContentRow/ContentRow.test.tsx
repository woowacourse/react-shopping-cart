import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContentRow from './ContentRow';

describe('ContentRow 컴포넌트', () => {
  test('제목과 내용을 올바르게 렌더링한다', () => {
    render(<ContentRow title="Test Title" content="Test Content" />);

    const titleElement = screen.getByText('Test Title');
    const contentElement = screen.getByText('Test Content');

    expect(titleElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
  });

  test('제목의 텍스트 속성을 올바르게 적용한다', () => {
    render(<ContentRow title="Title" content="Content" />);

    const titleElement = screen.getByText('Title');

    expect(titleElement).toHaveTextContent('Title');
  });

  test('내용의 텍스트 속성을 올바르게 적용한다', () => {
    render(<ContentRow title="Title" content="Content" />);

    const contentElement = screen.getByText('Content');

    expect(contentElement).toHaveTextContent('Content');
  });
});
