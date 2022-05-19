import Header from 'components/Header/Header.component';
import PageContainer from 'components/@shared/PageContainer/PageContainer.component';
import TitleBox from 'components/@shared/TitleBox/TitleBox.component';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import PaymentAmountContainer from 'components/PaymentAmountContainer/PaymentAmountContainer.component';
import CheckBox from 'components/@shared/CheckBox/CheckBox.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';
import BorderBox from 'components/@shared/BorderBox/BorderBox.component';
import ShoppingCartListContainer from 'components/ShoppingCartListContainer/ShoppingCartListContainer.component';
import Loading from 'components/Loading/Loading.component';
import useFetch from 'hooks/useFetch';

function ShoppingCartList() {
  const { data, isLoading, error } = useFetch(`${process.env.REACT_APP_API_HOST}/product`);
  return (
    <>
      <Header />
      <FlexBox justifyContent="center">
        <PageContainer width="1320px" direction="column" alignItems="center">
          <TitleBox>장바구니</TitleBox>
          <FlexBox width="1320px" justifyContent="space-between">
            <div>
              <FlexBox
                width="736px"
                height="80px"
                justifyContent="space-between"
                alignItems="center"
              >
                <FlexBox gap="10px">
                  <CheckBox />
                  <TextBox fontSize="small">선택해제</TextBox>
                </FlexBox>
                <BorderBox
                  width="117px"
                  height="50px"
                  lineHeight="50px"
                  textAlign="center"
                  cursor="pointer"
                >
                  상품삭제
                </BorderBox>
              </FlexBox>
              {isLoading ? <Loading /> : <ShoppingCartListContainer data={data} />}
            </div>
            <PaymentAmountContainer count={3} />
          </FlexBox>
        </PageContainer>
      </FlexBox>
    </>
  );
}

export default ShoppingCartList;
