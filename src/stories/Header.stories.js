import Header from '../components/Layout/Header';

import { Global } from '@emotion/react';
import GlobalStyles from 'styles/GlobalStyles';

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
    <Header {...args} />
  </>
);

export const DefaultTemplate = Template.bind({});
