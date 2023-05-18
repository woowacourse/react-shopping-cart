import { Meta } from '@storybook/react';
import CartListItemComponent from '../../components/cart/CartListItem';
import { RecoilRoot } from 'recoil';
import { styled } from 'styled-components';
import Checkbox from '../../components/cart/Checkbox';
import { useHandleCartList } from '../../hooks/useHandleCartList';

const meta = {
  component: CartListItemComponent,
  title: 'Components/CartListItem',
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
    item: {
      id: 1,
      quantity: 3,
      product: {
        id: 1,
        name: 'PET보틀-정사각(370ml)',
        price: 41000,
        imageUrl: `${process.env.PUBLIC_URL}/assets/product1.svg`,
      },
    },
  },
  argTypes: {
    item:{
      description: '카트에 담긴 아이템을 보여줍니다.'
    }
  },
} satisfies Meta<typeof CartListItemComponent>;

export default meta;

export const CartListItem = (args: any) => {
  const { handleCheckedItem } = useHandleCartList();
  return (
    <>
      <Checkbox onChange={handleCheckedItem(1)} isChecked={true} />
      <CartListItemComponent item={args.item} />
    </>
  );
};

const S = {
  StoryWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: calc(100vw - 32vw);
  `,

  Wrapper: styled.div`
    width: 50%;
    height: auto;
  `,
};
