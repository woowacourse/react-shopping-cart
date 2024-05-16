import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageBox from './ImageBox';

describe('ImageBox 컴포넌트', () => {
  test('src가 주어진 경우 이미지를 올바르게 렌더링한다', () => {
    render(<ImageBox src="test-image.jpg" width={100} height={100} />);
    const imgElement = screen.getByAltText('image');
    expect(imgElement).toHaveAttribute('src', 'test-image.jpg');
  });

  test('src가 주어지지 않은 경우 이미지가 비어 있는 상태로 렌더링된다', () => {
    render(<ImageBox width={100} height={100} />);
    const imgElement = screen.getByAltText('image');
    expect(imgElement).toHaveAttribute('src', '');
  });

  test('radius가 주어진 경우 올바르게 스타일이 적용된다', () => {
    const { rerender } = render(<ImageBox width={100} height={100} radius="s" />);
    expect(screen.getByAltText('image').parentElement).toHaveStyle('border-radius: 4px');

    rerender(<ImageBox width={100} height={100} radius="m" />);
    expect(screen.getByAltText('image').parentElement).toHaveStyle('border-radius: 8px');

    rerender(<ImageBox width={100} height={100} radius="l" />);
    expect(screen.getByAltText('image').parentElement).toHaveStyle('border-radius: 16px');

    rerender(<ImageBox width={100} height={100} radius={10} />);
    expect(screen.getByAltText('image').parentElement).toHaveStyle('border-radius: 10px');
  });

  test('width와 height가 올바르게 스타일이 적용된다', () => {
    render(<ImageBox width={200} height={150} />);
    const containerElement = screen.getByAltText('image').parentElement;
    expect(containerElement).toHaveStyle('width: 200px');
    expect(containerElement).toHaveStyle('height: 150px');
  });

  test('border가 주어진 경우 올바르게 스타일이 적용된다', () => {
    render(<ImageBox width={100} height={100} border="red" />);
    const containerElement = screen.getByAltText('image').parentElement;
    expect(containerElement).toHaveStyle('border: 1px solid red');
  });

  test('backgroundColor가 주어진 경우 올바르게 스타일이 적용된다', () => {
    render(<ImageBox width={100} height={100} backgroundColor="blue" />);
    const containerElement = screen.getByAltText('image').parentElement;
    expect(containerElement).toHaveStyle('background-color: blue');
  });
});
