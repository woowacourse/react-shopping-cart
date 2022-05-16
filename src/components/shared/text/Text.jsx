import Styled from 'components/shared/text/style';

const Text = ({ children, ...rest }) => {
  return <Styled.Text {...rest}>{children}</Styled.Text>;
};

export default Text;
