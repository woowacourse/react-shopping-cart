import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header/Header';
import Main from '../../components/layout/Main/Main';
import { PageLayout } from '../../components/layout/PageLayout/PageLayout';
import {
  bodyText,
  confirmLayout,
  subtitleText,
  titleText,
  totalPriceBox,
  backButton,
  backImg,
  bodyTextBox,
} from './Confirm.style';
import Button from '../../components/Common/Button/Button';
import { css } from '@emotion/react';

export function Confirm() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <PageLayout>
      <Header>
        <button css={backButton} onClick={handleBackClick}>
          <img css={backImg} src="./back.png" />
        </button>
      </Header>
      <Main>
        <div css={confirmLayout}>
          {state ? (
            <>
              <p css={titleText}>주문확인</p>
              <div css={bodyTextBox}>
                <p css={bodyText}>
                  총 {state.selectedItemGroupCount}종류의 상품{' '}
                  {state.selectedCartItem}
                  개를 주문합니다.
                </p>
                <p css={bodyText}>최종 결제 금액을 확인해 주세요.</p>
              </div>
              <div css={totalPriceBox}>
                <p css={subtitleText}>총 결제금액</p>
                <p css={titleText}>
                  {Number(state.totalPrice).toLocaleString('ko')}원
                </p>
              </div>
            </>
          ) : (
            <>
              <p>잘못된 접근입니다.</p>
              <Button
                onClick={handleBackClick}
                customCss={css`
                  padding: 10px;
                `}
              >
                장바구니 페이지로 돌아가기
              </Button>
            </>
          )}
        </div>
      </Main>
    </PageLayout>
  );
}
