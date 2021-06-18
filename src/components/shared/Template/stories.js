import Template from '.';

export default {
  component: Template,
  title: 'components/shared/Template',
};

const StoryTemplate = (args) => (
  <Template {...args}>
    <div style={{ backgroundColor: '#efefef', height: '50rem' }}>테스트</div>
  </Template>
);

export const Default = StoryTemplate.bind({});

Default.args = {};

export const TitledTemplate = StoryTemplate.bind({});

TitledTemplate.args = {
  title: '타이틀',
};
