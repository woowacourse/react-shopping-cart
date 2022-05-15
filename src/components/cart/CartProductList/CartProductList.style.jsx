import styled from 'styled-components';

export const Container = styled.section`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ListControlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

export const AllCheckControl = styled.div`
  display: flex;
  gap: 10px;
`;

export const CheckBoxLabel = styled.p``;

export const Button = styled.button`
  border: 1px solid #aaaaaa;
  background-color: transparent;
  padding: 10px;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 20px;
`;

export const ListWrapper = styled.div`
  border-top: 4px solid #aaaaaa;
`;
