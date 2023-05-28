import { StoryFn, Meta } from "@storybook/react";
import { Counter } from "../../components";
import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "@storybook/jest";

export default {
  title: "Counter",
  component: Counter,
} as Meta;

const Template: StoryFn = () => <Counter itemId={1} deleteable />;

export const CounterSample = Template.bind({});

CounterSample.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const countInput: HTMLInputElement = canvas.getByPlaceholderText("수량");
  await userEvent.clear(countInput);
  await userEvent.type(countInput, "2", { delay: 500 });

  const [ArrowUp, ArrowDown] = canvas.getAllByText("▾");
  await userEvent.click(ArrowUp);
  await userEvent.click(ArrowUp);

  expect(countInput.value).toBe("4");
  await userEvent.click(ArrowDown);
  await userEvent.click(ArrowDown);

  expect(countInput.value).toBe("2");
};
