import styled from 'styled-components';
import { Template, Button } from '../../components';
import { BAEMIN_CYAN, PATTERN_FILE_NAME } from '../../constants';

export const Page = styled(Template)`
  background-color: #ffffff;
`;

export const Container = styled.div`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.src.match(PATTERN_FILE_NAME)[0],
}))`
  width: 25rem;
  height: 25rem;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  width: 27rem;
`;

export const Name = styled.span`
  align-self: center;
  width: 24rem;
  margin: 1rem 0;
  font-size: 2rem;
`;

export const Price = styled.span`
  display: flex;
  justify-content: space-between;
  align-self: center;
  width: 24rem;
  margin: 1rem 0;
  & > span {
    font-size: 1.5rem;
  }
`;

export const AddToCartButton = styled(Button)`
  font-size: 1.25rem;
  background-color: ${BAEMIN_CYAN};
  color: #ffffff;
  width: 100%;
  height: 3rem;
  margin: 1.5rem 0;
`;
