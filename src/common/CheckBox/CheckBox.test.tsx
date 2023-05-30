import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CheckBox from './CheckBox';

describe('CheckBox 컴포넌트', () => {
  test('체크박스가 정상적으로 렌더링되고 체크 상태를 변경할 수 있어야 합니다.', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<CheckBox onChange={onChangeMock} />);

    //default
    const checkBox = getByTestId('checkbox');
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).not.toBeChecked();

    //checked
    fireEvent.click(checkBox);
    expect(checkBox).toBeChecked();
    expect(onChangeMock).toHaveBeenCalledTimes(1);

    //unchecked
    fireEvent.click(checkBox);
    expect(checkBox).not.toBeChecked();
    expect(onChangeMock).toHaveBeenCalledTimes(2);
  });
});
