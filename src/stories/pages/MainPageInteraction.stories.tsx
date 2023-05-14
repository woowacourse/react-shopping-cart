import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { screen, userEvent, waitFor, within } from '@storybook/testing-library';
import { RecoilRoot } from 'recoil';
import MainPage from '../../pages/MainPage';

const meta = {
  title: 'Pages/MainPage',
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
} satisfies Meta<typeof MainPage>;

export default meta;

type Story = StoryObj<typeof meta>;

const TYPING_SPEED = { delay: 500 };

export const SuccessInteraction: Story = {
  render: () => <MainPage />,

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    localStorage.clear();

    const purchaseProduct = (productOrder: number) => {
      const allCartIconButtons = canvas.getAllByLabelText('cart-icon-button');
      const selectedCartIconButton = allCartIconButtons[productOrder];

      expect(selectedCartIconButton).toBeVisible();

      return selectedCartIconButton;
    };

    await step('Purchase Product', async () => {
      await waitFor(() => {
        localStorage.clear();

        const secondCartIconButton = purchaseProduct(1);

        userEvent.click(secondCartIconButton);
      });
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await step('Raise Quantity', () => {
      const quantityInputButton = screen.getByRole('spinbutton');

      expect(quantityInputButton).toBeInTheDocument();

      const quantityInput = screen.getByLabelText('quantity-input');

      expect(quantityInput).toHaveValue(1);

      userEvent.clear(quantityInput);
      userEvent.type(quantityInput, '12', TYPING_SPEED);
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await step('Purchase Another Product', async () => {
      window.scrollTo({ top: 900, behavior: 'smooth' });

      await waitFor(() => {
        const ninthCartIconButton = purchaseProduct(7);

        userEvent.click(ninthCartIconButton);
      });
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await step('Purchase Another Product', async () => {
      await waitFor(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      await waitFor(() => {
        const firstCartIcon = purchaseProduct(0);

        userEvent.click(firstCartIcon);
      });
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await step('Cancel Purchasing Product', async () => {
      await waitFor(() => {
        const quantityInputs = screen.getAllByLabelText('quantity-input');
        const firstInput = quantityInputs[0];

        expect(firstInput).toBeInTheDocument();

        userEvent.clear(firstInput);
        userEvent.type(firstInput, '0', TYPING_SPEED);
      });
    });

    localStorage.clear();
  },
};
