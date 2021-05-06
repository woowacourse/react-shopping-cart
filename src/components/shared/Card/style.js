import styled from 'styled-components';

export const Container = styled.div`
  width: 282px;
`;

export const InformationWrapper = styled.div`
  position: relative;
  padding: 1rem 1rem 0;
`;

export const Title = styled.h4`
  display: -webkit-box;
  height: 2.5rem;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const DescriptionWrapper = styled.div`
  margin-top: 1rem;
`;
