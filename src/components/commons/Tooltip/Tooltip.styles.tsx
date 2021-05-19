import styled from 'styled-components';

export const Tooltip = styled.div`
  position: relative;
  width: 260px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 2px solid #2ac1bc;
  &:after,
  &:before {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-color: rgba(255, 255, 255, 0);
    border-top-color: #ffffff;
    border-width: 12px;
    margin-left: -12px;
  }

  &:before {
    border-color: rgba(42, 193, 188, 0);
    border-top-color: #2ac1bc;
    border-width: 15px;
    margin-left: -15px;
  }
`;

export const ToolTipText = styled.span`
  color: ${({ theme }) => theme.TEXT_COLOR};
  margin-bottom: 18px;
`;
export const ToolTipButtonWrapper = styled.div``;
