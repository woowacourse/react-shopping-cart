import styled from '@emotion/styled';

interface Props {
  isAvailable: boolean;
}

const UNAVAILABLE_COLOR = '#0000004A';
const AVAILABLE_COLOR = '#000000';

// @ts-expect-error : emotion flexContent Error
export const CouponItemContainer = styled.div<Props>(({ isAvailable }: Props) => {
  return {
    width: '318px',
    height: '82px',

    borderTop: '1px solid #0000001A',
    paddingTop: '12px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    rowGap: '12px',

    userSelect: 'none',
    cursor: isAvailable ? 'pointer' : 'default',
  };
});

export const CouponItemHeader = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  columnGap: '8px',
});

export const CouponTitle = styled.p<Props>(({ isAvailable }: Props) => {
  return {
    fontWeight: 700,
    fontSize: '16px',
    color: isAvailable ? AVAILABLE_COLOR : UNAVAILABLE_COLOR,
  };
});

export const CouponDescriptionContainer = styled.div({ height: '181px' });

export const CouponDescription = styled.p<Props>(({ isAvailable }: Props) => {
  return {
    fontWeight: 500,
    fontSize: '12px',
    color: isAvailable ? AVAILABLE_COLOR : UNAVAILABLE_COLOR,
  };
});
