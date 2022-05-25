import styled from "styled-components";

const StyledPageTitle = styled.h2`
  margin-bottom: 30px;

  text-align: center;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  color: ${({ theme }) => theme.color.grey_darker};
`;

const StyledPageContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  width: 1320px;
  padding: 50px 25px 0;

  border-top: 4px solid ${({ theme }) => theme.color.grey_darker};

  div:first-child {
    width: 736px;
  }
`;

const StyledSelectedProductManagementContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin-bottom: 26px;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;

  &:hover {
    cursor: pointer;
  }
`;

const StyledListTitle = styled.h3`
  height: 40px;
  margin-bottom: 16px;

  font-size: 20px;
  line-height: 33px;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.color.grey_darker};
`;

const StyledCartItemList = styled.ul`
  display: flex;
  flex-direction: column;

  width: 100%;

  border: none;
  border-top: 4px solid ${({ theme }) => theme.color.grey};
`;

export {
  StyledPageTitle,
  StyledPageContentContainer,
  StyledSelectedProductManagementContainer,
  StyledLabel,
  StyledListTitle,
  StyledCartItemList,
};
