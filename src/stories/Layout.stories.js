import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from 'components/Layout';

import { Global } from '@emotion/react';
import GlobalStyles from 'styles/GlobalStyles';
import store from 'store';

export default {
  title: 'Component/Layout',
  component: Layout,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => (
  <>
    <Global styles={GlobalStyles} />
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Layout {...args} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </>
);

export const DefaultTemplate = Template.bind({});

DefaultTemplate.args = {
  children: '이 공간에 페이지의 컨텐츠가 들어갑니다',
};
