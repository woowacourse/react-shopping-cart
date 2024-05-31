import * as ShippingManager from '../ShippingStates';
import { useManager } from './useManager';

const selectors = {
  isFarShippingLocation: ShippingManager.isFarShippingLocationSelector,
  deliveryFee: ShippingManager.deliveryFeeSelector,
};

const actions = {
  setFarShippingLocation: ShippingManager.isFarShippingLocationSelector,
};

const states = {
  isFarShippingLocation: ShippingManager.isFarShippingLocationSelector,
};

export const useShippingManager = () => useManager(selectors, actions, states);
