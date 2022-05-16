import StyledText from 'components/base/text/style';

const Text = ({ children, ...rest }) => {
  return <StyledText {...rest}>{children}</StyledText>;
};

export default Text;
