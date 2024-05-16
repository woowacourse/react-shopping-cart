import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button 컴포넌트', () => {
  test('children을 올바르게 렌더링한다', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('size 속성을 올바르게 적용한다', () => {
    const { rerender } = render(<Button size="s">Small</Button>);
    expect(screen.getByText('Small')).toHaveAttribute('data-size', 's');

    rerender(<Button size="m">Medium</Button>);
    expect(screen.getByText('Medium')).toHaveAttribute('data-size', 'm');

    rerender(<Button size="l">Large</Button>);
    expect(screen.getByText('Large')).toHaveAttribute('data-size', 'l');

    rerender(<Button size="fit">Fit</Button>);
    expect(screen.getByText('Fit')).toHaveAttribute('data-size', 'fit');
  });

  test('width 속성을 올바르게 적용한다', () => {
    const { rerender } = render(<Button width="fit">Fit Width</Button>);
    expect(screen.getByText('Fit Width')).toHaveAttribute('data-width', 'fit');

    rerender(<Button width="full">Full Width</Button>);
    expect(screen.getByText('Full Width')).toHaveAttribute('data-width', 'full');

    rerender(<Button width={200}>Fixed Width</Button>);
    expect(screen.getByText('Fixed Width')).toHaveAttribute('data-width', '200');
  });

  test('radius 속성을 올바르게 적용한다', () => {
    const { rerender } = render(<Button radius="s">Small Radius</Button>);
    expect(screen.getByText('Small Radius')).toHaveAttribute('data-radius', 's');

    rerender(<Button radius="m">Medium Radius</Button>);
    expect(screen.getByText('Medium Radius')).toHaveAttribute('data-radius', 'm');

    rerender(<Button radius="l">Large Radius</Button>);
    expect(screen.getByText('Large Radius')).toHaveAttribute('data-radius', 'l');

    rerender(<Button radius={10}>Custom Radius</Button>);
    expect(screen.getByText('Custom Radius')).toHaveAttribute('data-radius', '10');
  });

  test('color 속성을 올바르게 적용한다', () => {
    const { rerender } = render(<Button color="default">Default Color</Button>);
    expect(screen.getByText('Default Color')).toHaveAttribute('data-color', 'default');

    rerender(<Button color="primary">Primary Color</Button>);
    expect(screen.getByText('Primary Color')).toHaveAttribute('data-color', 'primary');
  });

  test('square 속성을 올바르게 적용한다', () => {
    render(<Button square>Square Button</Button>);
    expect(screen.getByText('Square Button')).toHaveAttribute('data-square', 'true');
  });

  test('isDisabled 속성을 올바르게 적용한다', () => {
    render(<Button isDisabled>Disabled Button</Button>);
    expect(screen.getByText('Disabled Button')).toBeDisabled();
  });

  test('onClick 이벤트를 올바르게 처리한다', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    fireEvent.click(screen.getByText('Clickable Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
