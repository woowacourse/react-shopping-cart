import { StoryFn, Meta } from "@storybook/react";
import Main from "../../pages/Main";
import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useResetRecoilState } from "recoil";
import { productsState } from "../../recoil/atom";
import { expect } from "@storybook/jest";

export default {
  title: "MainPage",
  component: Main,
} as Meta;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Template: StoryFn = () => {
  localStorage.clear();
  const reset = useResetRecoilState(productsState);
  reset();

  return <Main />;
};

export const MainPage = Template.bind({});

MainPage.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const cartButtons = canvas.getAllByAltText("카트");

  await sleep(1000);
  userEvent.click(cartButtons[0]);
  localStorage.clear();

  const cartItemCount = await canvas.findByText("장바구니");
  const count = cartItemCount.lastChild;
  expect(count).toHaveTextContent("1");
};
