import { css } from '@emotion/react';

import { addItem } from '@/apis/cartItem';

const AddButton = () => {
  const handleClick = async () => {
    const ids = [2, 3, 10, 11, 12];
    const randomValue = ids[Math.floor(Math.random() * ids.length)];
    await addItem(randomValue);
    window.location.reload();
  };

  return (
    <button css={floatingAddButton} onClick={handleClick}>
      추가
    </button>
  );
};

export default AddButton;

const floatingAddButton = css`
  position: fixed;
  display: flex;
  align-items: center;

  padding: 14px 19px;
  right: 0;
  bottom: 10px;
  border-radius: 24px;
  gap: 8px;

  background-color: gray;

  color: black;
  font-size: 14px;
  font-weight: 600;

  transform: translateX(-50%);
  cursor: pointer;
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    transform: translateX(-50%) scale(1.04);
  }
`;
