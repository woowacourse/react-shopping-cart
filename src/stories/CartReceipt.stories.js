import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Global } from '@emotion/react';

import CartReceipt from 'components/CartReceipt';
import store from 'store';

import GlobalStyles from 'styles/GlobalStyles';

export default {
  title: 'Component/CartReceipt',
  component: CartReceipt,
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
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<CartReceipt {...args} />} />
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
