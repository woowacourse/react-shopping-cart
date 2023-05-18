import styled from 'styled-components';
import { ProductSelectList } from './CartProductList';

export const ProductSelectSection = () => {
  return (
    <Style.Container>
      <Style.Header>
        <Style.HeaderTitle>든든 배송상품 (3개)</Style.HeaderTitle>
      </Style.Header>
      <ProductSelectList />
      <Style.SelectOrDeleteContainer>
        <Style.CheckBox />
        <Style.SelectedProductCount>전체선택 (2/3)</Style.SelectedProductCount>
        <Style.DeleteSelectedProductButton>
          선택삭제
        </Style.DeleteSelectedProductButton>
      </Style.SelectOrDeleteContainer>
    </Style.Container>
  );
};

const Style = {
  Container: styled.section`
    width: 740px;
    min-height: 704px;

    display: flex;
    flex-direction: column;
  `,
  Header: styled.div`
    width: 100%;
    height: 56px;

    border-bottom: 4px solid #aaaaaa;
  `,
  HeaderTitle: styled.h2`
    font-size: 20px;
    color: #333333;
  `,
  SelectOrDeleteContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 13px;

    margin-top: 23px;
  `,
  CheckBox: styled.div`
    width: 28px;
    height: 28px;

    border: 1px solid #22a6a2;
  `,
  SelectedProductCount: styled.span`
    font-size: 16px;
  `,
  DeleteSelectedProductButton: styled.button`
    width: 98px;
    height: 35px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid #bbbbbb;
    font-family: var(--baemin-font);
  `,
};
