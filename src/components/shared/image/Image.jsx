import styled from 'styled-components';

const StyledImage = styled.img`
  width: ${props => props.size || '282px'};
  height: ${props => props.size || '282px'};
`;

const Image = ({ ...rest }) => {
  return <StyledImage {...rest} />;
};

export default Image;
