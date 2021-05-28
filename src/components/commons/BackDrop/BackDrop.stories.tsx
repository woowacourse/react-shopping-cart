import BackDrop, { Props } from './BackDrop';

export default {
  title: 'Components/Commons/BackDrop',
  component: BackDrop,
};

const Template = (args: Props) => <BackDrop {...args}></BackDrop>;

export const Default = Template.bind({});
(Default as any).args = {
  zIndex: -1,
};
