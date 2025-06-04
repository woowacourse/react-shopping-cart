import { useContext } from 'react';
import { SelectedCartItemsContext } from './SelectedCartItemsProvider';

export const useSelectedCartItemsContext = () => {
  const context = useContext(SelectedCartItemsContext);

  if (!context) {
    throw new Error('useSelectedCartItemsContext must be used within a SelectedCartItemsProvider');
  }
  return context;
};
