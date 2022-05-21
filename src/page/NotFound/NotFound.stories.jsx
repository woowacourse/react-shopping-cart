import { BrowserRouter } from 'react-router-dom';
import { NotFound } from 'page';

export default {
  title: 'Component/NotFound',
  component: NotFound,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template = args => <NotFound {...args} />;

const DefaultNotFound = Template.bind({});

DefaultNotFound.args = {};

export { DefaultNotFound };
