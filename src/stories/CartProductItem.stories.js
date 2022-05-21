import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Global } from '@emotion/react';

import CartProductItem from '../components/CartProductItem';
import store from 'store';

import GlobalStyles from 'styles/GlobalStyles';
import Snackbar from 'components/Snackbar';

export default {
  title: 'Component/CartProductItem',
  component: CartProductItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => (
  <Provider store={store}>
    <Global styles={GlobalStyles} />
    <Snackbar />
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<CartProductItem {...args} />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export const DefaultTemplate = Template.bind({});

DefaultTemplate.args = {
  thumbnail: 'https://storybook.takealook.kr/image/potato.jpg',
  name: '감자',
  price: 50000,
  id: 0,
  isChecked: () => true,
  handleItemCount: () => {},
};
