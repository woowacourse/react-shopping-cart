import { BrowserRouter } from 'react-router-dom';
import { NotFound } from 'pages';

export default {
  title: 'Pages/NotFound',
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
