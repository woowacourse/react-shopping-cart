import type { StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import NotFound from '../NotFound';

export default {
  title: 'NotFound',
  component: NotFound,
};

const Template: StoryFn<React.ComponentProps<typeof NotFound>> = () => (
  <MemoryRouter>
    <NotFound />
  </MemoryRouter>
);

export const DefaultNotFound = Template.bind({});

DefaultNotFound.args = {};
