import { BrowserRouter } from 'react-router-dom';
import { PageLayout } from 'components';

export default {
  title: 'Components/PageLayout',
  component: PageLayout,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

const Template = args => <PageLayout {...args} />;

const DefaultPageLayout = Template.bind({});
const ShoppingCartPageLayout = Template.bind({});

ShoppingCartPageLayout.args = {
  header: '장바구니',
};

export { DefaultPageLayout, ShoppingCartPageLayout };
