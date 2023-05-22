import type { Meta, StoryObj } from '@storybook/react';
import CartList from '../../components/cart/CartList';
import { handlers } from '../../mocks/handlers';
import { CartListWrapper } from '../../style/ContentLayout';
import { styled } from 'styled-components';
import Header from '../../components/@common/Header';
import { within } from '@testing-library/react';
import { setDataInLocalStorage } from '../../utils/localStorage';
import { expect } from '@storybook/jest';
import userEvent from '@testing-library/user-event';

const mockData = [
  {
    id: 1,
    quantity: 1,
    product: {
      id: 1,
      name: 'PET보틀-정사각(420ml)',
      price: 43400,
      imageUrl: '/assets/product1.svg',
    },
  },
  {
    id: 2,
    quantity: 2,
    product: {
      id: 2,
      name: 'PET보틀-밀크티(370ml)',
      price: 73400,
      imageUrl: '/assets/product2.svg',
    },
  },
  {
    id: 3,
    quantity: 3,
    product: {
      id: 3,
      name: 'PET보틀-정사각(370ml)',
      price: 41000,
      imageUrl: '/assets/product3.svg',
    },
  },
];

const meta = {
  title: 'Pages/cart/CartList',
  component: CartList,
  parameters: {
    msw: handlers,
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <S.Wrapper>
          <Story />
        </S.Wrapper>
      );
    },
  ],
} satisfies Meta<typeof CartList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interaction: Story = {
  decorators: [
    (Story) => {
      return (
        <>
          <HeaderWrapper>
            <Header title="CART" />
          </HeaderWrapper>

          <Story />
        </>
      );
    },
  ],
  play: async ({ canvasElement }) => {
    window.localStorage.clear();

    setDataInLocalStorage('cart', mockData);

    const canvas = within(canvasElement);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    const badge = document.querySelector('#cart-badge');
    expect(badge).toContainHTML('3')

    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const totalPrice = document.querySelector('#total-price')!;
    expect(totalPrice).toHaveTextContent('총 주문금액316,200원')
    
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const checkedAllItems = document.querySelector('#check-all-items')!;
    userEvent.click(checkedAllItems);
    expect(totalPrice).toHaveTextContent('총 주문금액3,000원')
    
    // const removeSelectedItems = document.querySelector('#remove-checked-items')!;
    // await userEvent.click(removeSelectedItems);
    // await userEvent.click( screen.getByRole('button', { name: '확인' }));
    // expect(badge).toContainHTML('0')

  },
};

const S = {
  Wrapper: styled(CartListWrapper)`
    width: calc(100vw - 5vw);
  `,
};

const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
