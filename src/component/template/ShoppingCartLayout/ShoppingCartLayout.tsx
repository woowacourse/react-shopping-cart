import emptyImage from '../../../asset/img/empty_page.png';
import { CartProductDetailType } from '../../../type';
import { numberWithCommas } from '../../../util';
import CheckBox from '../../molecule/CheckBox/CheckBox';
import PaymentInfoBox from '../../molecule/PaymentInfoBox/PaymentInfoBox';
import ShoppingCartItemList from '../../organism/ShoppingCartItemList/ShoppingCartItemList';
import {
  Container,
  DeleteButton,
  EmptyPageImage,
  OptionContainer,
  PaymentInfoBoxContainer,
  ShoppingCartContainer,
  ShoppingCartListTitle,
} from './ShoppingCartLayout.styles';

interface ShoppingCartLayoutProps {
  shoppingCartProducts: { [key: number]: CartProductDetailType };
  checkedProductList: Array<CartProductDetailType>;
  onClickCheckBox: React.MouseEventHandler<HTMLDivElement>;
  onClickAmountCounter: (id: string, type: string) => void;
  isAllChecked: boolean;
  expectedPrice: number;
  onClickAllCheckBox: React.MouseEventHandler<HTMLDivElement>;
  onClickDeleteButton: (id: string) => void;
  onClickDeleteAllButton: () => void;
  onClickPaymentButton: React.MouseEventHandler<HTMLButtonElement>;
}
const ShoppingCartLayout = ({
  shoppingCartProducts,
  checkedProductList,
  onClickCheckBox,
  onClickAmountCounter,
  onClickAllCheckBox,
  isAllChecked,
  onClickDeleteButton,
  onClickDeleteAllButton,
  expectedPrice,
  onClickPaymentButton,
}: ShoppingCartLayoutProps) => (
  <>
    <Container>
      {Object.values(shoppingCartProducts).length === 0 ? (
        <EmptyPageImage src={emptyImage} alt="empty page" />
      ) : (
        <>
          <ShoppingCartContainer>
            <OptionContainer>
              <CheckBox
                id="all-check"
                onClick={onClickAllCheckBox}
                isChecked={isAllChecked}
              />
              <span>모두선택</span>
              <DeleteButton
                onClick={() => onClickDeleteAllButton()}
                disabled={!checkedProductList.length}
              >
                상품삭제
              </DeleteButton>
            </OptionContainer>

            <ShoppingCartListTitle>{`장바구니 상품 (${
              Object.values(shoppingCartProducts).length
            }개)`}</ShoppingCartListTitle>

            <ShoppingCartItemList
              shoppingCartProducts={shoppingCartProducts}
              checkedProductList={checkedProductList}
              onClickCheckBox={onClickCheckBox}
              onClickDeleteButton={onClickDeleteButton}
              onClickAmountCounter={onClickAmountCounter}
            />
          </ShoppingCartContainer>

          <PaymentInfoBoxContainer>
            <PaymentInfoBox
              title="결제예상금액"
              detailText="결제예상금액"
              price={`${numberWithCommas(expectedPrice)} 원`}
              buttonText={`주문하기(${checkedProductList.length}개)`}
              onClick={onClickPaymentButton}
              isDisable={!checkedProductList.length}
            />
          </PaymentInfoBoxContainer>
        </>
      )}
    </Container>
  </>
);

export default ShoppingCartLayout;
