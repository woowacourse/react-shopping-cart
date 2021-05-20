import { ProductDetailType, ProductType } from '../../../type';
import ColumnProductItem from '../../molecule/ColumnProductItem/ColumnProductItem';
import PageIndexNav from '../../molecule/PageIndexNav/PageIndexNav';
import { Container, LikedProductFilter } from './ProductListLayout.styles';

interface ProductListPageProps {
  showLikedProduct: boolean;
  maxPageIndex: number;
  pageIndex: number;
  likedProducts: {
    [key: string]: ProductDetailType;
  };
  displayProductList: Array<ProductType>;
  onClickShoppingCartButton: (id: string) => void;
  onClickLikeButton: (id: string) => void;
  onClickShowLikedProductButton: React.MouseEventHandler<HTMLButtonElement>;
  onClickPrevPage: React.MouseEventHandler<HTMLButtonElement>;
  onClickNextPage: React.MouseEventHandler<HTMLButtonElement>;
}

const ProductListLayout = ({
  onClickShowLikedProductButton,
  showLikedProduct,
  displayProductList,
  likedProducts,
  onClickShoppingCartButton,
  onClickLikeButton,
  onClickPrevPage,
  pageIndex,
  onClickNextPage,
  maxPageIndex,
}: ProductListPageProps) => (
  <>
    <Container>
      <LikedProductFilter>
        <button type="button" onClick={onClickShowLikedProductButton}>
          {showLikedProduct ? '전체 상품 보기' : '찜한 상품만 보기'}
        </button>
      </LikedProductFilter>
      {displayProductList.length !== 0 &&
        displayProductList.map(({ product_id, image_url, name, price }) => (
          <ColumnProductItem
            key={product_id}
            product_id={product_id}
            image_url={image_url}
            name={name}
            isLiked={!!likedProducts[product_id]}
            price={price}
            onClickShoppingCartButton={() =>
              onClickShoppingCartButton(product_id)
            }
            onClickLikeButton={() => onClickLikeButton(product_id)}
            $buttonStyle="simple"
          />
        ))}
    </Container>

    <PageIndexNav
      onClickPrevPage={onClickPrevPage}
      pageIndex={pageIndex}
      onClickNextPage={onClickNextPage}
      maxPageIndex={maxPageIndex}
    />
  </>
);

export default ProductListLayout;
