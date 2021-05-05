import IconButton from '.';

export default {
  component: IconButton,
  title: 'components/shared/IconButton',
};

const StoryTemplate = (args) => <IconButton {...args} />;

export const Default = StoryTemplate.bind({});

Default.args = {
  imgSrc: 'https://picsum.photos/200/200',
  width: '200px',
  height: '200px',
};
