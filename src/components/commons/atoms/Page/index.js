import PropTypes from 'prop-types';
import * as Styled from './style.js';

export const Page = (props) => {
  const { children } = props;
  return (
    <>
      <Styled.Page>
        <Styled.Container>{children}</Styled.Container>
      </Styled.Page>
    </>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
};
