import styled from 'styled-components';
import COLOR from '../../../constants/color';

export const Container = styled.div`
  background-color: ${COLOR.WHITE};
  display: flex;
  width: 100%;
  padding: 40px 24px;
  border-bottom: 1.5px solid ${COLOR['GRAY-300']};
`;

export const InformationWrapper = styled.div`
  margin-left: 2%;
`;

export const Title = styled.h4`
  display: -webkit-box;
  width: 80%;
  height: 2.5  font-size: 1.25rem;
  font-weight: normal;
  line-height: 1.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: ${COLOR.BLACK};
`;

export const Description = styled.span``;

export const ExtraWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 30%;
`;
