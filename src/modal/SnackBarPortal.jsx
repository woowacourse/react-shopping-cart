import ReactDOM from "react-dom";

const SnackBarPortal = ({ children }) => {
  const $snackBarModal = document.getElementById("snack-bar-modal");
  return ReactDOM.createPortal(children, $snackBarModal);
};

export default SnackBarPortal;
