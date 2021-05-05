import styled from 'styled-components';

export const Container = styled.li`
  margin: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img.attrs((props) => ({
  src: props.src,
  alt: 'test',
}))`
  width: 100%;
`;

export const Footer = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
`;

export const Label = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.span`
  font-size: 1rem;
  margin: 0.2rem 0;
`;

export const Price = styled.span`
  font-size: 1.25rem;
  margin: 0.2rem 0;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;
