import { css, styled } from 'styled-components';
import Button from '../common/Button';

const SelectedProductList = () => {
  return (
    <S.Wrapper>
      <S.Title>든든배송 상품 (3개)</S.Title>
      <S.Fieldset>
        <S.Checkbox type="checkbox" id="horns" name="horns" />
        <label htmlFor="horns">전체선택 (2/3)</label>
        <Button css={deleteButtonStyle}>선택삭제</Button>
      </S.Fieldset>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    width: 100%;
    max-width: 736px;
  `,

  Title: styled.h3`
    padding-bottom: 24px;
    font-size: 20px;
    border-bottom: 4px solid var(--gray-color-300);
  `,

  Fieldset: styled.fieldset`
    display: flex;
    align-items: center;
  `,

  Checkbox: styled.input`
    width: 28px;
    height: 28px;
    margin-right: 14px;
  `,
};

const deleteButtonStyle = css`
  margin-left: 20px;
  padding: 6px 12px 10px;
  background: none;
  border: 1px solid var(--gray-color-100);
`;

export default SelectedProductList;
