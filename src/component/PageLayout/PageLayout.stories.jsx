import { PageLayout } from 'component';

export default {
  title: 'Component/PageLayout',
  component: PageLayout,
  parameters: {
    layout: 'centered',
  },
};

const Template = args => <PageLayout {...args} />;

const DefaultPageLayout = Template.bind({});

export { DefaultPageLayout };
