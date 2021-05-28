import PaymentCheckout from './PaymentCheckout';
import { render } from '@testing-library/react';

describe('PaymentCheckout Component', () => {
  it('PaymentCheckout Snapshot', () => {
    const paymentCheckoutUtil = render(
      <PaymentCheckout buttonText="buttonText" price={'2000'} title="title" priceLabel="priceLabel" />
    );
    expect(paymentCheckoutUtil.asFragment()).toMatchSnapshot();
  });
});
