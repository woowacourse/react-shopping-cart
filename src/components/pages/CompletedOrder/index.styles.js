import styled, { css } from 'styled-components';
import { Page } from '../../@common/PageWrapper/index.styles';

export const Main = styled(Page)`
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
  transition: all 0.2s ease;
  position: relative;
  width: 100%;
  margin: 0 auto;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  position: relative;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 0.95rem;
  z-index: 1;

  :hover {
    color: var(--color-mint);
  }
`;

export const LeftButton = styled(ArrowButton)`
  left: 17rem;
`;

export const RightButton = styled(ArrowButton)`
  right: 17rem;
`;
