import Styled from 'components/Text/index.style';

const Text = ({ children, ...rest }) => {
  return <Styled.Text {...rest}>{children}</Styled.Text>;
};

export default Text;
