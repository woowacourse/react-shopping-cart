import StyledQuantityBox from 'components/quantityBox/style';

const QuantityBox = ({ children, ...rest }) => {
  return <StyledQuantityBox {...rest}>{children}</StyledQuantityBox>;
};

export default QuantityBox;
