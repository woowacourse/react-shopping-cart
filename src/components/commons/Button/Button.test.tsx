import Button from './Button';
import { render } from '@testing-library/react';

const buttonText = '버튼 텍스트';

describe('Button Component', () => {
  it('Button Snapshot', () => {
    const smallButtonUtil = render(<Button size="SM">{buttonText}</Button>);
    expect(smallButtonUtil.asFragment()).toMatchSnapshot();

    const mediumButtonUtil = render(<Button size="MD">{buttonText}</Button>);
    expect(mediumButtonUtil.asFragment()).toMatchSnapshot();

    const largeButtonUtil = render(<Button size="LG">{buttonText}</Button>);
    expect(largeButtonUtil.asFragment()).toMatchSnapshot();
  });
});
