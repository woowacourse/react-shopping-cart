import * as S from "./ProductList.style.ts";

import ProductItemSkeleton from "../ProductItem/ProductItem.skeleton.tsx";

const ProductListSkeleton = () => {
    return (
        <S.ListWrapper>
            {Array.from({length: 3}).map((_, index) => (
                <ProductItemSkeleton key={index}/>
            ))}
        </S.ListWrapper>
    );
};

export default ProductListSkeleton;
