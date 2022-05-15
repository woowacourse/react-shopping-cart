import Footer from '../components/Layout/Footer';

import { Global } from '@emotion/react';
import GlobalStyles from 'styles/GlobalStyles';

export default {
  title: 'Component/Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => (
  <>
    <Global styles={GlobalStyles} />
    <Footer {...args} />
  </>
);

export const DefaultTemplate = Template.bind({});
