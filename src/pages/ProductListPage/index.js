import { useHistory } from 'react-router-dom';

import { useProduct, useCart } from '../../hooks';
import { RedirectNotice } from '../../components';
import { Item, ItemSkeleton } from './Item';
import * as S from './style';

const SKELETON_PREVIEW_COUNT = 5;

export const ProductListPage = () => {
  const history = useHistory();
  const { products, isLoading, isError } = useProduct();
  const { addProduct } = useCart();

  return (
    <S.Page>
      <S.Main>
        {isError ? (
          <RedirectNotice
            interjection="앗..."
            notice={`결제에 실패하였습니다... 문제가 지속되면 관리자에게 문의부탁드려요...`}
            buttonText="장바구니로 돌아가기"
            redirectRoute={() => {
              history.go(0);
            }}
          />
        ) : (
          <S.ProductList>
            {isLoading
              ? Array.from({ length: SKELETON_PREVIEW_COUNT }).map((_, index) => (
                  <ItemSkeleton key={index} />
                ))
              : products?.map((product) => {
                  const { productId } = product;

                  return (
                    <Item
                      key={productId}
                      product={product}
                      addProduct={() => addProduct(productId)}
                    />
                  );
                })}
          </S.ProductList>
        )}
      </S.Main>
    </S.Page>
  );
};
