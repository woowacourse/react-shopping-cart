import Layout from '.';

export default {
  title: 'Component/Layout/Default Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => <Layout {...args}>컨텐츠가 들어갈 영역</Layout>;

export const DefaultTemplate = Template.bind({});
DefaultTemplate.parameters = {
  controls: { hideNoControlsWarning: true },
};
