import { css } from '@emotion/react';

const IconButtonLayout = (width: 'sm' = 'sm') => {
  const getWidthBySize = () => {
    switch (width) {
      case 'sm':
        return '24px';
    }
  };

  return css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${getWidthBySize()};
    height: ${getWidthBySize()};
    border: 1px solid #0000001a;
    border-radius: 8px;
    background-color: white;
    cursor: pointer;
  `;
};

const IconImage = (width: 'sm' = 'sm') => {
  const getWidthBySize = () => {
    switch (width) {
      case 'sm':
        return '12px';
    }
  };

  return css`
    width: ${getWidthBySize()};
  `;
};

export { IconButtonLayout, IconImage };
