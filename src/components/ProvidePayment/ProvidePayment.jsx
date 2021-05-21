import React, { createContext, useContext, useState } from "react";
import { PropTypes } from "prop-types";

const paymentContext = createContext();

export const usePayment = () => useContext(paymentContext);

const ProvidePayment = ({ children }) => {
  const [isReadyToPay, setIsReadyToPay] = useState(false);

  const payment = {
    isReady: isReadyToPay,
    getReady: () => setIsReadyToPay(true),
    done: () => setIsReadyToPay(false),
  };

  return (
    <paymentContext.Provider value={payment}>
      {children}
    </paymentContext.Provider>
  );
};

ProvidePayment.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProvidePayment;
