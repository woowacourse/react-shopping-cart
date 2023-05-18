import { Meta } from '@storybook/react';
import QuantityInputComponent from '../../components/QuantityInput';
import { RecoilRoot } from 'recoil';
import { styled } from 'styled-components';
import { useHandleProduct } from '../../hooks/useHandleProduct';

const meta = {
  component: QuantityInputComponent,
  title: 'Components/QuantityInput',
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <S.StoryWrapper>
            <Story />
          </S.StoryWrapper>
        </RecoilRoot>
      );
    },
  ],
  args: {
    id: '1',
    value: 1,
    onChange: () => {},
    onIncrement: () => {},
    onDecrement: () => {},
    onBlur: () => {},
  },
  argTypes: {
    value: {
      control: true,
      description: '수량을 나타냅니다.'
    },
    onChange:{
        description: '수량의 변화를 감지하고 0~99 사이의 숫자만 입력되도록 합니다.'
    },
    onIncrement: {
      description: '+버튼을 클릭하면 수량이 1씩 증가합니다.',
    },
    onDecrement: {
      description: '-버튼을 클릭하면 수량이 1씩 감소합니다.',
    },
    onBlur:{
        description: ''
    }
  },
} satisfies Meta<typeof QuantityInputComponent>;

export default meta;

export const QuantityInput = (args: any) => {
  const {
    newQuantity,
    handleNumberInputChange,
    handleIncreaseItem,
    handleDecreaseItem,
  } = useHandleProduct(args.id);
  return (
    <QuantityInputComponent
      id={args.id}
      value={newQuantity}
      onChange={handleNumberInputChange}
      onIncrement={handleIncreaseItem}
      onDecrement={handleDecreaseItem}
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
