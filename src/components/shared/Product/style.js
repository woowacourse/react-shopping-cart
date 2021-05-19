import styled, { css } from 'styled-components';
import COLOR from '../../../constants/color';

export const Container = styled.div`
  background-color: ${COLOR.WHITE};
  display: flex;
  width: 100%;
  padding: 2% 24px;
`;

export const InformationWrapper = styled.div`
  width: 100%;
  margin-left: 2%;
`;

export const Title = styled.h4`
  display: -webkit-box;
  width: 80%;
  font-size: 1.25rem;
  font-weight: normal;
  line-height: 1.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: ${COLOR.BLACK};

  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    `};
`;

export const Description = styled.div`
  margin-top: 1rem;
`;

export const ExtraWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 30%;
`;
