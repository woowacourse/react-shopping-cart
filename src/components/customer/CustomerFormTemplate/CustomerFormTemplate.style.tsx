import styled, { css } from 'styled-components';

export const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 30px;

  box-sizing: border-box;
  padding: 50px;

  border-radius: 4px;

  -webkit-box-shadow: 1px 1.5px 3px 0px rgba(20, 24, 82, 0.27);
  box-shadow: 2px 3px 6px 0px rgba(20, 24, 82, 0.27);
`;

export const FormTitle = styled.h1`
  font-size: 1.7rem;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > button {
    font-size: 0.9rem;
    margin-top: 0.5rem;

    border: 1px solid ${({ theme }) => theme.brandColor_1};
  }

  & > p {
    display: flex;
    justify-content: center;
    gap: 10px;
    & > a {
      text-decoration: underline;
      text-decoration-color: ${({ theme }) => theme.brandColor_1};
      color: ${({ theme }) => theme.brandColor_1};
      font-weight: 600;
      transition: opacity 0.2s;
    }
    & > a:hover {
      opacity: 0.7;
    }
  }
`;
