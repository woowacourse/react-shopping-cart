import styled, { css } from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  color: ${({ theme }) => theme.black};

  .circle {
    position: absolute;
    right: 0;
    width: 43px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    transform-origin: 85px;
    transition: 0.3s;
    z-index: 1;
  }

  .circle.minus {
    cursor: pointer;
    transition-delay: 0.1s;
    font-size: 2rem;
    color: ${({ theme }) => theme.red};
  }

  .circle.quantity {
    transition-delay: 0.2s;
    font-size: 1.5rem;
  }

  .circle.plus {
    cursor: pointer;
    transition-delay: 0.3s;
    font-size: 2rem;
    color: ${({ theme }) => theme.blue};
  }

  .circle.minus p {
    transform: rotate(calc(360deg / -8));
  }

  .circle.quantity p {
    transform: rotate(calc(360deg / -8 * 2));
  }

  .circle.plus p {
    transform: rotate(calc(360deg / -8 * 3));
  }

  .img-wrapper {
    z-index: 2;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    border-radius: 100%;
    background-color: white;
    transition: all 0.2s;
  }

  .img-wrapper img {
    width: 30px;
    height: 30px;
  }

  .img-wrapper:hover {
    transform: scale(1.2);
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
  }

  ${({ showQuantity }) =>
    showQuantity &&
    css`
      .circle {
        right: 64px;
        box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
      }

      .circle.minus {
        transform: rotate(calc(360deg / 8));
      }

      .circle.quantity {
        transform: rotate(calc(360deg / 8 * 2));
      }

      .circle.plus {
        transform: rotate(calc(360deg / 8 * 3));
      }

      .bottom .img-wrapper {
        transform: scale(1.2);
        box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
      }
    `}
`;
