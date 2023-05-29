import styled from "styled-components";
import Option from "../common/selector/option";
import OptionContent from "../common/selector/optionContent";
import OptionGroup from "../common/selector/optionGroup";
import OptionIndicator from "../common/selector/optionIndicator";
import checkIcon from "../../asset/check.png";
import SelectBox from "../common/selector/selectBox";
import QuantityCounter from "../common/QuantityCounter";
import { DeleteButtonIc } from "../../asset";
import SelectorTitle from "../common/selector/selectorTitle";
import useSelect from "../../hooks/useSelect";
import { CartType } from "../../type/cart";
import { useAddCartCount } from "../../hooks/useAddCartCount";
import useFetch from "../../hooks/useFetch";

export default function CartSelector() {
  const {
    selected: selectedProduct,
    toggleSelectBox: toggleProductSelect,
    toggleAll,
    deleteId,
    checkIsAllSelected,
  } = useSelect();
  const { cartsData, getCount, increaseQuantity, decreaseQuantity } =
    useAddCartCount();
  const { removeCartProduct } = useFetch();

  async function deleteProduct(id: number[]) {
    id.forEach((itemId) => {
      deleteId(itemId);
    });

    removeCartProduct(id);
  }

  async function selectDelete() {
    Array.from(selectedProduct).forEach((itemId) => {
      deleteId(itemId);
    });

    await deleteProduct(Array.from(selectedProduct));
  }

  return (
    <SelectBox>
      <Wrapper>
        <SelectorTitle>
          <CheckButton
            onClick={() => toggleAll(cartsData.map((item) => item.product.id))}>
            {checkIsAllSelected<CartType>(cartsData) && (
              <CheckIcon src={checkIcon} />
            )}
          </CheckButton>
          <>선택된 상품 {selectedProduct.size}개 </>
        </SelectorTitle>
        <OptionGroup>
          {cartsData.map((item: CartType, index) => (
            <Option>
              <OptionIndicator
                onClick={() => toggleProductSelect(item.product.id)}
                id={index}>
                <CheckButton>
                  {selectedProduct?.has(item.product.id) && (
                    <CheckIcon src={checkIcon} />
                  )}
                </CheckButton>
              </OptionIndicator>
              <OptionContent asChild>
                <ContentWrapper>
                  <ProductInfo>
                    <Image src={item.product.imageUrl} />
                    <Name>{item.product.name}</Name>
                  </ProductInfo>
                  <ProductCount>
                    <DeleteButtonIc
                      onClick={() => deleteProduct([item.product.id])}
                    />
                    <QuantityCounter
                      count={item.quantity}
                      getCount={getCount}
                      increaseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity}
                      id={item.id}
                    />
                    {item.product.price}
                  </ProductCount>
                </ContentWrapper>
              </OptionContent>
            </Option>
          ))}
        </OptionGroup>
        <SelectDeleteButton onClick={selectDelete}>
          선택 삭제
        </SelectDeleteButton>
      </Wrapper>
    </SelectBox>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 750px) {
    width: 44rem;
  }
`;

const CheckButton = styled.button`
  width: 2rem;
  height: 2rem;

  margin-right: 1.5rem;

  background-color: transparent;
  border: 0.1rem solid ${({ theme }) => theme.colors.primary};
`;

const CheckIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

const Image = styled.img`
  width: 14rem;
  height: 14rem;

  margin-right: 2rem;
`;
const Name = styled.div`
  ${({ theme }) => theme.fonts.price}
`;

const ProductInfo = styled.div`
  display: flex;
`;

const ProductCount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  height: 11rem;
`;

const SelectDeleteButton = styled.button`
  height: 2rem;
  width: 10rem;
`;
