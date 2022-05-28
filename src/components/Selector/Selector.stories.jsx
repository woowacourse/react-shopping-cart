import Selector from './Selector';

export default {
  title: 'Components/Selector',
  component: Selector,
  parameters: {
    layout: 'centered',
  },
};

const Template = args => <Selector {...args} />;

const EntireSelector = Template.bind({});

EntireSelector.args = {
  label: '전체',
};

export { EntireSelector };
