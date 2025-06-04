import { useContext } from 'react';
import { SelectedCartContext } from './SelectedCartProvider';

export const useSelectedCartContext = () => {
  const context = useContext(SelectedCartContext);

  if (!context) {
    throw new Error('useSelectedCartContext must be used within a SelectedCartProvider');
  }
  return context;
};
