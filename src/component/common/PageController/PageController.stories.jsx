import PageController from '.';

export default {
  title: 'Component/Common/PageController',
  component: PageController,
  argTypes: {
    onClickButton: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = args => <PageController {...args} />;

const Default = Template.bind({});

Default.args = {
  pageLength: 10,
  currentPage: 1,
};

export { Default };
