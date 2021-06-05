import styled, { css } from 'styled-components';

export const Main = styled.div`
  & > ul > li {
    margin-bottom: 2rem;
  }
`;

const Checked = css`
  color: var(--color-mint);
  font-weight: 800;
`;

export const PageButton = styled.button`
  padding: 1rem;
  font-size: 0.825rem;

  ${({ currentPage, page }) => currentPage === page && Checked}

  :hover {
    color: var(--color-mint);
  }
`;

export const PageButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`;

export const PageButtonDimmer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const ArrowButton = styled.button`
  :hover {
    color: var(--color-mint);
  }
`;
