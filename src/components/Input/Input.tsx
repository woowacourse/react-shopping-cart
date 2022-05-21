import React from 'react';
import styled from 'styled-components';

type InputProps = React.HTMLProps<HTMLInputElement>;

function Input(props: InputProps) {
  return (
    <StyledInputBox>
      <input {...props} />
      <StyledInputStepButtonBox>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.25rem"
            height="1.25rem"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.25rem"
            height="1.25rem"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </StyledInputStepButtonBox>
    </StyledInputBox>
  );
}

const StyledInputBox = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  outline: 1px solid #dddddd;

  input {
    align-self: end;
    width: 73px;
    height: 60px;
    border: none;
    outline: none;
    text-align: center;
    font-size: 1.5rem;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

const StyledInputStepButtonBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  outline: inherit;

  button {
    height: 100%;
    background: none;
    color: inherit;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;

export default Input;
