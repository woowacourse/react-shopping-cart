import styled from '@emotion/styled';

const Root = styled.li`
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1.5px solid ${(props) => props.theme.borderColor.defaultGrey};
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-left: 15px;
  box-sizing: border-box;
  border-radius: 2px;
`;

const Info = styled.div``;

const Title = styled.div`
  margin-left: 20px;
  font-size: 20px;
  letter-spacing: 0.5px;
  margin-bottom: 15px;
`;

const Quantity = styled.div`
  margin-left: 20px;
  font-size: 16px;
  letter-spacing: 0.5px;
`;

export default {
  Root,
  Image,
  Info,
  Title,
  Quantity,
};
