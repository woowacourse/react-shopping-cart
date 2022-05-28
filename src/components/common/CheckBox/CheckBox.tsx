import styled, { css } from 'styled-components';

const CheckBoxInput = styled.input.attrs(() => ({
  type: 'checkbox',
}))`
  display: none;
`;

const CheckBoxLabel = styled.label`
  position: relative;

  border: 1px solid ${({ theme }) => theme.blackColor_2};
  padding: 10px;
  border-radius: 4px;

  max-height: 22px;

  ${({ checked }: { checked: boolean }) =>
    checked &&
    css`
      background-color: ${({ theme }) => theme.brandColor_1};

      &::after {
        content: '✓';
        color: ${({ theme }) => theme.whiteColor_1};
        position: absolute;
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);
      }
    `};
`;

function CheckBox({ isChecked, onClick }) {
  return (
    <>
      <CheckBoxLabel checked={isChecked} onClick={onClick} />
      <CheckBoxInput defaultChecked={isChecked} />
    </>
  );
}

export default CheckBox;
