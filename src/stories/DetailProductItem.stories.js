import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Global } from '@emotion/react';

import DetailProductItem from 'components/DetailProductItem';
import store from 'store';

import GlobalStyles from 'styles/GlobalStyles';

export default {
  title: 'Component/DetailProductItem',
  component: DetailProductItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
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
        <Route path="*" element={<DetailProductItem {...args} />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export const DefaultTemplate = Template.bind({});

DefaultTemplate.args = {
  thumbnail: 'https://storybook.takealook.kr/image/potato.jpg',
  name: '감자',
  price: 50000,
};
