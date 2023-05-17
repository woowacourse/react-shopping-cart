import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { styled } from 'styled-components';
import {
  TEST_ADD_CART_BUTTON,
  TEST_BUCKET_COUNTER_BOTTOM_BUTTON,
  TEST_BUCKET_COUNTER_TOP_BUTTON,
  TEST_CART_COUNT_INPUT,
} from '@constants/testId';
import AddCartButton from './AddCartButton';

const AddCartStory = () => {
  return (
    <>
      <AddCartButton addProductToCart={() => {}} id={1} />
      <Circle data-testid="circle" />
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

    await step('장바구니 버튼을 클릭해 추가한다.', async () => {
      await userEvent.click(canvas.getByTestId(TEST_ADD_CART_BUTTON));
    });

    await step('버튼을 클릭해 장바구니 갯수를 올린다.', async () => {
      await userEvent.click(canvas.getByTestId(TEST_BUCKET_COUNTER_TOP_BUTTON));
    });

    await step('버튼을 클릭해 장바구니 갯수를 내린다.', async () => {
      await userEvent.click(
        canvas.getByTestId(TEST_BUCKET_COUNTER_BOTTOM_BUTTON)
      );
    });

    await step(
      '버튼을 클릭해 장바구니 갯수를 0으로 만들고 장바구니 버튼으로 돌아간다.',
      async () => {
        await userEvent.click(
          canvas.getByTestId(TEST_BUCKET_COUNTER_BOTTOM_BUTTON)
        );
      }
    );
  },
};

export const ShowErrorMessage: Story = {
  args: { addProductToCart: () => {}, removeProductFromCart: () => {} },

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('장바구니 버튼을 클릭해 추가한다.', async () => {
      await userEvent.click(canvas.getByTestId(TEST_ADD_CART_BUTTON));
    });

    await step('장바구니 갯수를 1001개로 만들어 에러를 표시한다.', async () => {
      await userEvent.clear(canvas.getByTestId(TEST_CART_COUNT_INPUT));
      await userEvent.type(canvas.getByTestId(TEST_CART_COUNT_INPUT), '1001');
    });

    await step(
      '버튼을 눌러 장바구니 갯수를 1000개로 만든다. 에러 메세지를 없앤다.',
      async () => {
        await userEvent.click(
          canvas.getByTestId(TEST_BUCKET_COUNTER_BOTTOM_BUTTON)
        );
      }
    );

    await step(
      '버튼을 눌러 장바구니 갯수를 1001개로 만든다. 에러 메세지를 만든다.',
      async () => {
        await userEvent.click(
          canvas.getByTestId(TEST_BUCKET_COUNTER_TOP_BUTTON)
        );
      }
    );
  },
};

export const FocusOff: Story = {
  args: { addProductToCart: () => {}, removeProductFromCart: () => {} },

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('장바구니 버튼을 클릭해 추가한다.', async () => {
      await userEvent.click(canvas.getByTestId(TEST_ADD_CART_BUTTON));
    });

    await step('장바구니 갯수를 0개 만든다', async () => {
      await userEvent.clear(canvas.getByTestId(TEST_CART_COUNT_INPUT));
    });

    await step(
      '장바구니 수량 조절 도구가 아닌 곳을 클릭한다. 장바구니 버튼으로 모양이 돌아간다.',
      async () => {
        await userEvent.click(canvas.getByTestId('circle'));
      }
    );
  },
};
