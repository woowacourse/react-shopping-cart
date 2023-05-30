import { Meta } from '@storybook/react';
import QuantityInputComponent from '../../components/QuantityInput';
import { styled } from 'styled-components';
import { ChangeEventHandler, useState } from 'react';
import { validateQuantityInput } from '../../utils/validateQuantityInput';
import { NONE_QUANTITY, NOT_NUMBER } from '../../constants';
import { changeInvalidValueToBlank } from '../../utils/changeInvalidValueToBlank';

const meta = {
  component: QuantityInputComponent,
  title: 'Components/QuantityInput',
  tags: ['autodocs'],
  args: {
    id: '1',
    onChange: () => {},
    onIncrement: () => {},
    onDecrement: () => {},
    onBlur: () => {},
  },
  argTypes: {
    value: {
      control: true,
      description: '수량을 나타냅니다.',
    },
    onChange: {
      description: '수량의 변화를 감지하고 0~99 사이의 숫자만 입력되도록 합니다.',
    },
    onIncrement: {
      description: '+버튼을 클릭하면 수량이 1씩 증가합니다.',
    },
    onDecrement: {
      description: '-버튼을 클릭하면 수량이 1씩 감소합니다.',
    },
    onBlur: {
      description: '',
    },
  },
  decorators: [
    (Story) => {
      return (
        <S.StoryWrapper>
          <Story onChange={() => {}} onIncrement={() => {}} onDecrement={() => {}} />
        </S.StoryWrapper>
      );
    },
  ],
} satisfies Meta<typeof QuantityInputComponent>;

export default meta;

export const QuantityInputStory = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    if (!validateQuantityInput(newQuantity)) return;

    setQuantity(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = quantity - 1;
    if (!validateQuantityInput(newQuantity)) return;

    setQuantity(newQuantity);
  };

  const handleChangeNumberInput: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    if (value === '00' && Number(value) === NONE_QUANTITY) {
      return;
    }

    const newQuantity = changeInvalidValueToBlank(value, NOT_NUMBER);

    setQuantity(newQuantity);
  };

  return (
    <QuantityInputComponent
      id={'1'}
      value={quantity}
      onChange={handleChangeNumberInput}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
    />
  );
};

const S = {
  StoryWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: calc(100vw - 32vw);
  `,
};
