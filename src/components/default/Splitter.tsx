import { css } from "@emotion/css";

const Splitter = () => <div className={splitterCSS}></div>;

const splitterCSS = css`
  height: 1px;
  background-color: var(--grey-200);
`;
export default Splitter;
