import type { StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Estimate from '../Estimate';

export default {
  title: 'Estimate',
  component: Estimate,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const Template: StoryFn<React.ComponentProps<typeof Estimate>> = (props) => <Estimate {...props} />;

export const DefaultEstimate = Template.bind({});
DefaultEstimate.args = {
  totalItemCount: 5,
  selectedItemCount: 0,
  totalPrice: 21700,
};
