import { useEffect } from 'react';
import InitialLoading from '.';
import useFetchCartRedux from '../../../hooks/useFetchCartRedux';
import ShoppingCartPage from '../../../pages/ShoppingCartPage';

export default {
  component: InitialLoading,
  title: 'components/shared/InitialLoading',
};

const StoryTemplate = (args) => {
  const { isLoading, fetchCartItemRedux } = useFetchCartRedux();

  useEffect(() => {
    fetchCartItemRedux();
  }, []);

  return <InitialLoading {...args} isLoading={isLoading} />;
};

export const Default = StoryTemplate.bind({});

Default.args = {
  children: <ShoppingCartPage />,
};
