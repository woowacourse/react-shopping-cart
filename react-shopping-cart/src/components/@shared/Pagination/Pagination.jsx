import styled from 'styled-components';

// 재사용O
// TODO: Pagination 컴포넌트에 관련된 컴포넌트랑 합치기
function Pagination({ children }) {
  return <Styled.Root>{children}</Styled.Root>;
}

const Styled = {
  Root: styled.div`
    display: flex;
    gap: 15px;
  `,
};

export default Pagination;
