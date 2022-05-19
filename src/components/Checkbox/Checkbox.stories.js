import Checkbox from 'components/Checkbox';

export default {
  title: 'components/Checkbox',
  component: Checkbox,
};

const Template = (args) => <Checkbox {...args} />;

export const 전체선택체크박스 = Template.bind({});

전체선택체크박스.args = {
  name: '전체선택',
  checked: true,
  onChange: () => null,
};

export const 개별선택체크박스 = Template.bind({});

개별선택체크박스.args = {
  name: '',
  checked: true,
  onChange: () => null,
};
