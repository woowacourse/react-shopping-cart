import { userEvent } from '@storybook/testing-library';
import { PartialStoryFn } from '@storybook/types';

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const delayClick = async (element: HTMLElement, ms: number = 300) => {
  await delay(ms);
  userEvent.click(element);
};
