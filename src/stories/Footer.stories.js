import Footer from '../components/Layout/Footer';

export default {
  title: 'Component/Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <Footer {...args} />;

export const DefaultTemplate = Template.bind({});
