import React from 'react';
import styled from 'styled-components';
import CartItem from '../../components/CartItem/CartItem';

function CartPage() {
  return (
    <>
      <h2 style={{ fontSize: '24px', fontWeight: '600', textAlign: 'center' }}>
        장바구니
      </h2>
      <StyledHr />

      <div style={{ display: 'flex' }}>
        <section style={{ width: '60%', marginTop: '50px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'items-center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                style={{
                  appearance: 'none',
                  border: '1px solid #2ac1bc',
                  borderRadius: '2px',
                  width: '1.75rem',
                  height: '1.75rem',
                  cursor: 'pointer',
                }}
                name="checkbox"
                type="checkbox"
                checked={true}
              />
              <label style={{ paddingLeft: '7px' }} htmlFor="checkbox">
                선택해제
              </label>
            </div>
            <button
              style={{ padding: '12px 22px', border: '1px solid #bbbbbb' }}
            >
              상품삭제
            </button>
          </div>
          <h3
            style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}
          >
            든든배송 상품 (3개)
          </h3>
          <StyledHr variant="gray" />
          <CartItem
            product={{
              id: '1',
              name: '[든든] 전처리 양파 다이스 15mm(1.5*1.5*1.5/국내산) 1KG',
              price: 3940,
              image:
                'https://user-images.githubusercontent.com/44823900/167772500-dff4dfb5-6ad2-48fe-937d-81bc6800d0e2.jpg',
              description: '전처리 양파 다이스',
              stock: 76,
              brandId: '1',
              categoryId: '1',
              createdAt: 1652193534410,
            }}
            count={1}
          />
          <StyledHr variant="thin" />
          <CartItem
            product={{
              id: '1',
              name: '[든든] 전처리 양파 다이스 15mm(1.5*1.5*1.5/국내산) 1KG',
              price: 3940,
              image:
                'https://user-images.githubusercontent.com/44823900/167772500-dff4dfb5-6ad2-48fe-937d-81bc6800d0e2.jpg',
              description: '전처리 양파 다이스',
              stock: 76,
              brandId: '1',
              categoryId: '1',
              createdAt: 1652193534410,
            }}
            count={1}
          />
          <StyledHr variant="thin" />
          <CartItem
            product={{
              id: '1',
              name: '[든든] 전처리 양파 다이스 15mm(1.5*1.5*1.5/국내산) 1KG',
              price: 3940,
              image:
                'https://user-images.githubusercontent.com/44823900/167772500-dff4dfb5-6ad2-48fe-937d-81bc6800d0e2.jpg',
              description: '전처리 양파 다이스',
              stock: 76,
              brandId: '1',
              categoryId: '1',
              createdAt: 1652193534410,
            }}
            count={1}
          />
          <StyledHr variant="thin" />
        </section>
        <CartRightSection>
          <CartRightSectionTop>
            <CartTitle>결제예상금액</CartTitle>
          </CartRightSectionTop>
          <StyledHr variant="thin" />
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 30px',
                marginTop: '20px',
              }}
            >
              <HighlightText>결제예상금액</HighlightText>
              <HighlightText>21,800원</HighlightText>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '30px 30px 0 30px',
              }}
            >
              <PrimaryButton>주문하기(3개)</PrimaryButton>
            </div>
          </div>
        </CartRightSection>
      </div>
    </>
  );
}

type StyledHrProps = {
  variant?: string;
};

const StyledHr = styled.hr`
  width: 100%;
  border: ${({ variant }: StyledHrProps) => {
    if (variant === 'gray') return '2px solid #aaaaaa';

    if (variant === 'thin') return '1px solid #aaaaaa';

    return '2px solid black';
  }};
`;

const CartRightSection = styled.section`
  width: 35%;
  height: 260px;
  margin-left: 5%;
  margin-top: 80px;

  border: 1px solid #dddddd;
`;

const CartRightSectionTop = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 30px;
`;

const CartTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const HighlightText = styled.span`
  position: relative;
  font-weight: 700;
  display: inline-block;
  text-align: center;
  padding: 0 2px;
  font-size: 20px;

  ::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 8px;
    background-color: #2ac1bc;
    opacity: 0.5;
    z-index: ${({ theme: { zPriorities } }) => zPriorities.behind};
  }
`;

const PrimaryButton = styled.button`
  background: #2ac1bc;
  font-size: 24px;
  color: white;
  width: 100%;
  padding: 16px;
`;

export default CartPage;
