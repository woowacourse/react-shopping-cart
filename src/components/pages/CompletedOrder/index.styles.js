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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(${({ translate }) => `${translate}%`});
`;

export const PageButtonDimmer = styled.div`
  transition: all 0.2s ease;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  margin: 0 auto;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  position: relative;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 0.95rem;

  :hover {
    color: var(--color-mint);
  }
`;

export const LeftButton = styled(ArrowButton)`
  left: 12rem;
`;

export const RightButton = styled(ArrowButton)`
  right: 12rem;
`;
