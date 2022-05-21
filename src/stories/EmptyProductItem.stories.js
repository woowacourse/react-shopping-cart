import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Global } from '@emotion/react';

import EmptyProductItem from 'components/EmptyProductItem';
import store from 'store';

import GlobalStyles from 'styles/GlobalStyles';

export default {
  title: 'Component/EmptyProductItem',
  component: EmptyProductItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => (
  <Provider store={store}>
    <Global styles={GlobalStyles} />
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<EmptyProductItem {...args} />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export const DefaultTemplate = Template.bind({});
