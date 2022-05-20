const { createContext } = require("react");

const ModalContext = createContext({
  isVisible: false,
  hide: () => undefined,
  show: () => undefined,
});

export default ModalContext;
