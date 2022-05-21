import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from '../components/Layout/Header';

import { Global } from '@emotion/react';
import GlobalStyles from 'styles/GlobalStyles';
import store from 'store';

export default {
  title: 'Component/Header',
  component: Header,
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
          <Route path="*" element={<Header {...args} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </>
);

export const DefaultTemplate = Template.bind({});
