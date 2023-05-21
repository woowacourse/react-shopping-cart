import styled from 'styled-components';

/**
 * 레이아웃 관련 CSS 스타일은 Bootstrap 기준으로 적용했습니다.
 */

export const Container = styled.div`
  padding: 0 20px;
  margin: 0 auto;
  max-width: 100%;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 540px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 720px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 960px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    max-width: 1140px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xxl}) {
    max-width: 1320px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 1rem;
  column-gap: 1rem;
`;

export const Column = styled.div`
  margin: auto;
  width: 90%;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 48%;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 32%;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: 24%;
  }
`;
