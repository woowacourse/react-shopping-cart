import { Product } from '@customTypes/Product';

import { StyledCartList } from '@components/pages/CartListSection/CartList/CartList.styled';
import { FetchedDataList } from '@components/commons/FetchedDataList/FetchedDataList';
import ErrorModal from '@pages/ErrorPage/ErrorModal/ErrorModal';
import CartItem from '@components/pages/CartListSection/CartList/CartItem/CartItem';

const CartList = () => {
  return (
    <FetchedDataList<Product[]>
      endpoint={process.env.PUBLIC_URL + '/mockData.json'}
      initialValue={[]}
    >
      {({ data, fetchStatus }) => {
        return (
          <>
            <ErrorModal fetchStatus={fetchStatus} />
            <StyledCartList>
              {data.map((item: Product) => (
                <CartItem key={item.id} product={{ ...item }} />
              ))}
            </StyledCartList>
          </>
        );
      }}
    </FetchedDataList>
  );
};

export default CartList;
