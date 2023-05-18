import type { StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import CartListPage from '../CartListPage';

export default {
  title: 'CartListPage',
  component: CartListPage,
};

const Template: StoryFn<React.ComponentProps<typeof CartListPage>> = () => (
  <MemoryRouter>
    <CartListPage />
  </MemoryRouter>
);

export const DefaultCartListPage = Template.bind({});

DefaultCartListPage.args = {};
