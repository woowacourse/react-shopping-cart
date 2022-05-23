import MainPage from './MainPage';
import productsHandlers from '../../mocks/handlers/products';

export default {
  title: 'Page/MainPage',
  component: MainPage,
};

function Template(args) {
  return <MainPage {...args} />;
}

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: {
      products: productsHandlers,
    },
  },
};
