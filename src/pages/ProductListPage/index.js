import { useHistory } from 'react-router-dom';

import { useProducts, useCart } from '../../hooks';
import { RedirectNotice } from '../../components';
import { Item, ItemSkeleton } from './Item';
import * as S from './style';

const SKELETON_PREVIEW_COUNT = 5;

export const ProductListPage = () => {
  const history = useHistory();
  const { products, isLoading, isError } = useProducts();
  const { addProduct } = useCart();

  return (
    <S.Page>
      <S.Main>
        {isError ? (
          <RedirectNotice
            interjection="앗..."
            notice={`상품 목록을 불러오는데 실패했습니다... 문제가 지속되면 관리자에게 문의부탁드려요...`}
            buttonText="다시 시도하기"
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
