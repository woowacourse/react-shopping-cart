import styled from "styled-components";

const Styled = {
  Container: styled.li`
    display: flex;
    width: 100%;
    padding: 20px 0;

    gap: 15px;

    &:not(:last-child) {
      border-bottom: 1px solid #aaaaaa;
    }
  `,
};

export default Styled;
