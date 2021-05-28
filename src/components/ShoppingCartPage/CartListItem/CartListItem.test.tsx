import CartListItem from './CartListItem';
import { render } from '@testing-library/react';

describe('CartListItem Component', () => {
  it('CartListItem Snapshot', () => {
    const onCartItemDelete = () => {
      console.log('onCartItemDelete');
    };

    const setQuantity = () => {
      console.log('setQuantity');
    };

    const setSelected = () => {
      console.log('setQuantity');
    };

    const cartListItemUtil = render(
      <CartListItem
        name="이름"
        price="2000"
        isSelected={true}
        onCartItemDelete={onCartItemDelete}
        quantity="2"
        setQuantity={setQuantity}
        setSelected={setSelected}
      ></CartListItem>
    );

    expect(cartListItemUtil.asFragment()).toMatchSnapshot();
  });
});
