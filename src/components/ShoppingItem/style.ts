import styled from 'styled-components';

type ContainerProps = {
  width: string;
};

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  column-gap: 20px;
  width: ${(props) => props.width};
`;

type CheckboxProps = {
  isChecked: boolean;
};

export const Checkbox = styled.div<CheckboxProps>`
  font-size: 24px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  border: ${(props) => (props.isChecked ? '#3288FF' : '#22A6A2')} 1px solid;
  color: ${(props) => (!props.isChecked ? 'transparent' : '#ffffff')};
  background-color: ${(props) => props.isChecked && '#333333'};
`;

export const ShoppingItemImage = styled.img`
  width: 150px;
  height: 150px;
`;

export const ShoppingItemName = styled.div`
  color: #333333;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
`;

export const RightContents = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  justify-items: flex-end;
`;

export const DeleteButton = styled.img`
  align-self: flex-start;
`;

export const ShoppingItemPrice = styled.div`
  align-self: flex-end;
  color: #333333;
  font-weight: 400;
  line-height: 24px;
`;
