import styled, {css} from 'styled-components';

const imgSizes = {
  xs: css`
    width: 120px;
    height: 120px;
  `,
  s: css`
    width: 144px;
    height: 144px;
  `,
  m: css`
    width: 283px;
    height: 283px;
  `,
  l: css`
    width: 570px;
    height: 570x;
  `,
};

const FlexRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'center'};
  gap: ${(props) => props.gap || 0};

  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};
`;

const FlexColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'center'};
  gap: ${(props) => props.gap || 0};

  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};
`;

const Image = styled.img`
  ${({imgSize}) => imgSizes[imgSize]}
`;

export {FlexRowWrapper, FlexColWrapper, Image};
