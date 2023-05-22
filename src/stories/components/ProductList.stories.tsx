import type { Meta, StoryObj } from '@storybook/react';
import ProductList from '../../components/main/ProductList';
import { handlers } from '../../mocks/handlers';
import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from '@storybook/jest';
import Header from '../../components/@common/Header';
import { styled } from 'styled-components';

const meta = {
  title: 'Pages/product/ProductList',
  component: ProductList,
  tags: ['autodocs'],
  parameters: {
    msw: handlers,
  },
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
} satisfies Meta<typeof ProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interaction: Story = {
  decorators: [
    (Story) => {
      return (
        <>
          <HeaderWrapper>
            <Header title="STORE" />
          </HeaderWrapper>
          <Wrapper>
            <Story />
          </Wrapper>
        </>
      );
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    window.localStorage.clear();

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const badge = document.querySelector('#cart-badge');
    expect(badge).toContainHTML('0')

    const addCartButton = document.querySelectorAll('svg')[1];
    await userEvent.click(addCartButton);
    expect(canvas.getAllByLabelText('increase'));
    expect(badge).toContainHTML('1')


    await new Promise((resolve) => setTimeout(resolve, 1000));

    const increaseButton = document.querySelector('button[aria-label="increase"]')!;
    await userEvent.click(increaseButton);
    expect(canvas.getByDisplayValue(2));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const quantityInput = document.getElementById('product1')!;
    await userEvent.type(quantityInput, '0', { delay: 200 });
    expect(canvas.getByDisplayValue(20));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await userEvent.type(quantityInput, '{backspace}{backspace}', { delay: 200 });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const decreaseButton = document.querySelector('button[aria-label="decrease"]')!;
    await userEvent.click(decreaseButton);

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(badge).toContainHTML('0')

  },
};

const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const Wrapper = styled.div`
  margin-top: 120px;
`;
