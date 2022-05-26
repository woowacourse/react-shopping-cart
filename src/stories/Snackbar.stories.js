import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Global } from '@emotion/react';

import Snackbar from 'components/Snackbar';
import snackbarStore from './config/snackbarStore';

import GlobalStyles from 'styles/GlobalStyles';

export default {
  title: 'Component/Snackbar',
  component: Snackbar,
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

const Template = (args) => {
  return (
    <Provider store={snackbarStore}>
      <Global styles={GlobalStyles} />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Snackbar {...args} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export const DefaultTemplate = Template.bind({});
