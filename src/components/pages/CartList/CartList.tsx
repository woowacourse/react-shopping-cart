import { Product } from '@customTypes/Product';

import { StyledCartList } from '@pages/CartList/CartList.styled';
import { FetchedDataList } from '@components/commons/FetchedData/FetchedDataList';
import ErrorModal from '@pages/ErrorPage/ErrorModal/ErrorModal';
import CartItem from '@pages/CartList/CartItem/CartItem';

const CartList = () => {
  return (
    <FetchedDataList<Product[]>
      endpoint={process.env.PUBLIC_URL + '/mockData.json'}
      initialValue={[]}
    >
      {({ data, errorStatus }) => {
        return (
          <>
            <ErrorModal errorStatus={errorStatus} />
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
