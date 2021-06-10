import { useHistory, useParams } from 'react-router-dom';

import { useProduct, useCart } from '../../hooks';
import { Line, RedirectNotice, SkeletonResponsiveBox, SkeletonLine } from '../../components';
import * as S from './style';
import { getFormattedAsKRW } from '../../utils';
import { COLOR } from '../../constants';

export const ProductDetailPage = () => {
  const history = useHistory();
  const { productId } = useParams();
  const { product, isLoading, isError } = useProduct(productId);
  const { addProduct } = useCart();
  const handleImageError = (e) => {
    // TODO: 이미지 로딩 실패 시 에러 처리
  };

  return (
    <S.Page>
      <S.Main>
        {isError ? (
          <RedirectNotice
            interjection="앗..."
            notice={`상품 정보를 불러오는데 실패했습니다... 문제가 지속되면 관리자에게 문의부탁드려요...`}
            buttonText="다시 시도하기"
            redirectRoute={() => {
              history.go(0);
            }}
          />
        ) : (
          <S.ProductDetail>
            {isLoading ? (
              <>
                <SkeletonResponsiveBox />
                <SkeletonLine />
                <Line color={COLOR.HEX.GRAY_400}></Line>
                <S.Label>
                  <SkeletonLine />
                </S.Label>
                <SkeletonLine style={{ height: '4.5rem' }} />
              </>
            ) : (
              <>
                <S.Image src={product.imageUrl} onError={handleImageError} />
                <S.Name>{product.name}</S.Name>
                <Line color={COLOR.HEX.GRAY_400}></Line>
                <S.Label>
                  <span>금액</span>
                  <span>{getFormattedAsKRW(product.price)}</span>
                </S.Label>
                <S.AddButton onClick={() => addProduct(product.productId)}>장바구니</S.AddButton>
              </>
            )}
          </S.ProductDetail>
        )}
      </S.Main>
    </S.Page>
  );
};
