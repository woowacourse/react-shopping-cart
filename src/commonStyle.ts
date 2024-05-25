import styled from 'styled-components';

export const CommonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8125rem;

  padding: 2.25rem 1.5rem;
  padding-bottom: 8rem;
`;

export const CommonContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;

  text-align: center;
`;

export const PageContainer = styled.section`
  width: 26.875rem;
  min-height: 100vh;
  position: relative;

  background-color: ${(props) => props.theme.color.white};
`;

export const Divider = styled.div`
  border: 0.5px solid ${(props) => props.theme.color.borderGray};
`;

export const CommonButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: none;
  border-radius: 8px;

  cursor: pointer;
`;
