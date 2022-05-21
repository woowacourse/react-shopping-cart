import { Selector } from 'component';

export default {
  title: 'Component/Selector',
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
