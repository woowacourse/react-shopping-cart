import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { styled } from 'styled-components';
import useControlCart from '@hooks/useControlCart';
import { ProductInformation } from '@type/types';
import AddCartButton from './AddCartButton';

const product: ProductInformation = {
  id: 1,
  name: 'ad',
  imageUrl: '',
  price: 1,
};

const AddCartStory = () => {
  const { addProductToCart } = useControlCart();
  return (
    <>
      <AddCartButton
        addProductToCart={() => addProductToCart(product)}
        id={product.id}
      />
      <Circle aria-label="circle" />
    </>
  );
};

const Circle = styled.div`
  width: 50px;
  height: 50px;

  margin-top: 50px;
  border-radius: 50%;

  background-color: purple;
`;

const meta: Meta<typeof AddCartStory> = {
  title: 'AddCartButton',
  component: AddCartStory,
};

export default meta;
type Story = StoryObj<typeof AddCartStory>;

export const Default: Story = {
  args: { addProductToCart: () => {}, removeProductFromCart: () => {} },

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('장바구니 버튼을 클릭해 추가한다.', () => {
      userEvent.click(canvas.getByLabelText('장바구니 버튼'));
    });

    await step('버튼을 클릭해 장바구니 갯수를 올린다.', () => {
      userEvent.click(canvas.getByLabelText('장바구니 수량 증가 버튼'));
    });

    await step('버튼을 클릭해 장바구니 갯수를 내린다.', () => {
      userEvent.click(canvas.getByLabelText('장바구니 수량 감소 버튼'));
    });

    await step(
      '버튼을 클릭해 장바구니 갯수를 0으로 만들고 장바구니 버튼으로 돌아간다.',
      () => {
        userEvent.click(canvas.getByLabelText('장바구니 수량 감소 버튼'));
      }
    );
  },
};

export const ShowErrorMessage: Story = {
  args: { addProductToCart: () => {}, removeProductFromCart: () => {} },

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('장바구니 버튼을 클릭해 추가한다.', async () => {
      userEvent.click(canvas.getByLabelText('장바구니 버튼'));
    });

    await step('장바구니 갯수를 1001개로 만들어 에러를 표시한다.', () => {
      userEvent.clear(canvas.getByLabelText('장바구니 수량 입력 창'));
      userEvent.type(canvas.getByLabelText('장바구니 수량 입력 창'), '1001');
    });

    await step(
      '버튼을 눌러 장바구니 갯수를 1000개로 만든다. 에러 메세지를 없앤다.',
      () => {
        userEvent.click(canvas.getByLabelText('장바구니 수량 감소 버튼'));
      }
    );

    await step(
      '버튼을 눌러 장바구니 갯수를 1001개로 만든다. 에러 메세지를 만든다.',
      () => {
        userEvent.click(canvas.getByLabelText('장바구니 수량 증가 버튼'));
      }
    );
  },
};

export const FocusOff: Story = {
  args: { addProductToCart: () => {}, removeProductFromCart: () => {} },

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('장바구니 버튼을 클릭해 추가한다.', () => {
      userEvent.click(canvas.getByLabelText('장바구니 버튼'));
    });

    await step('장바구니 갯수를 0개 만든다', () => {
      userEvent.clear(canvas.getByLabelText('장바구니 수량 입력 창'));
    });

    await step(
      '장바구니 수량 조절 도구가 아닌 곳을 클릭한다. 장바구니 버튼으로 모양이 돌아간다.',
      () => {
        userEvent.click(canvas.getByLabelText('circle'));
      }
    );
  },
};
