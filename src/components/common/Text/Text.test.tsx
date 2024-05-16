import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Text from './Text';

describe('Text 컴포넌트', () => {
  test('children을 올바르게 렌더링한다', () => {
    render(<Text>Test Text</Text>);
    const textElement = screen.getByText('Test Text');
    expect(textElement).toBeInTheDocument();
  });

  test('기본 사이즈와 무게를 올바르게 적용한다', () => {
    render(<Text>Default Text</Text>);
    const textElement = screen.getByText('Default Text');
    expect(textElement).toHaveStyle('font-size: 16px');
    expect(textElement).toHaveStyle('line-height: 16px');
    expect(textElement).toHaveStyle('font-weight: 700');
  });

  test('s 사이즈와 s 무게를 올바르게 적용한다', () => {
    render(
      <Text size="s" weight="s">
        Small Text
      </Text>,
    );
    const textElement = screen.getByText('Small Text');
    expect(textElement).toHaveStyle('font-size: 12px');
    expect(textElement).toHaveStyle('line-height: 18px');
    expect(textElement).toHaveStyle('font-weight: 300');
  });

  test('m 사이즈와 m 무게를 올바르게 적용한다', () => {
    render(
      <Text size="m" weight="m">
        Medium Text
      </Text>,
    );
    const textElement = screen.getByText('Medium Text');
    expect(textElement).toHaveStyle('font-size: 16px');
    expect(textElement).toHaveStyle('line-height: 16px');
    expect(textElement).toHaveStyle('font-weight: 500');
  });

  test('l 사이즈와 l 무게를 올바르게 적용한다', () => {
    render(
      <Text size="l" weight="l">
        Large Text
      </Text>,
    );
    const textElement = screen.getByText('Large Text');
    expect(textElement).toHaveStyle('font-size: 24px');
    expect(textElement).toHaveStyle('line-height: 34px');
    expect(textElement).toHaveStyle('font-weight: 700');
  });

  test('number 사이즈를 올바르게 적용한다', () => {
    render(
      <Text size={20} weight="m">
        Number Size Text
      </Text>,
    );
    const textElement = screen.getByText('Number Size Text');
    expect(textElement).toHaveStyle('font-size: 20px');
    expect(textElement).toHaveStyle('line-height: 30px');
  });
});
