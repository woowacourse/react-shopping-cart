import { useEffect } from 'react';
import InitialLoading from '.';
import useCartItems from '../../../hooks/useCartItems';
import ShoppingCartPage from '../../../pages/ShoppingCartPage';

export default {
  component: InitialLoading,
  title: 'components/shared/InitialLoading',
};

const StoryTemplate = (args) => {
  const { isLoading, loadCartItems } = useCartItems();

  useEffect(() => {
    loadCartItems();
  }, []);

  return <InitialLoading {...args} isLoading={isLoading} />;
};

export const Default = StoryTemplate.bind({});

Default.args = {
  children: <ShoppingCartPage />,
};
