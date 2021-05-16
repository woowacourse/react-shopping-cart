import styled from 'styled-components';
import { Props } from './ListItem';
import { COLORS } from '../../../constants/colors';

type ItemProps = Pick<Props, 'size'>;

const THUMBNAIL_SIZE = {
  SM: {
    width: '120px',
    height: '120px',
  },
  MD: {
    width: '142px',
    height: '142px',
  },
};

const PRICE_SIZE = {
  SM: {
    marginBottom: '18px',
  },
  MD: {
    marginBottom: '25px',
  },
};

const PRICE_COLOR = {
  SM: {
    color: COLORS.BLACK_500,
  },
  MD: {
    color: COLORS.GRAY_700,
  },
};

export const ListItem = styled.li`
  display: inline-flex;
`;

export const Thumbnail = styled.img<{ size: ItemProps['size'] }>(({ size }) => ({
  objectFit: 'cover',
  objectPosition: 'center',
  marginRight: '18px',
  ...THUMBNAIL_SIZE[size],
}));

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.span<{ size: ItemProps['size']; theme: Object }>(({ size, theme }) => ({
  fontSize: '20px',
  color: theme.TEXT_COLOR,
  letterSpacing: '0.5px',
  ...PRICE_SIZE[size],
}));

export const Price = styled.span<{ size: ItemProps['size']; theme: Object }>(({ size, theme }) => ({
  letterSpacing: '0.5px',
  ...PRICE_COLOR[size],
}));
