import React from 'react';
import { styled } from 'styled-components';
import BucketCounter from '@components/common/BucketCounter';
import CheckBox from '@components/common/CheckBox';
import { TRASH_LOGO } from '@assets/images';
import { device, theme } from '@styles/theme';

interface CartItemProps {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  isSelected: boolean;
}

const CartItem = ({
  id,
  name,
  imageUrl,
  price,
  quantity,
  isSelected,
}: CartItemProps) => {
  const localePrice = price.toLocaleString('ko-KR');
  return (
    <Wrapper>
      <LeftInformationWrapper>
        <CheckBox isChecked={isSelected} onClick={() => {}} />
        <Image title={name} src={imageUrl} alt="장바구니 아이템" />
        <Title title={name}>{name}</Title>
      </LeftInformationWrapper>
      <RightInformationWrapper>
        <TrashLogo src={TRASH_LOGO} alt="장바구니 아이템 삭제/" />
        <BucketCounter
          kind="large"
          id={id}
          quantity={quantity}
          showMinCountAlert={true}
        />
        <Price title={`${localePrice} 원`}>{localePrice} 원</Price>
      </RightInformationWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 30px 0;
  border-top: 1.5px solid ${theme.colors.whiteGray2};

  @media ${device.laptopL} {
    display: block;

    border: none;
  }
`;

const LeftInformationWrapper = styled.div`
  display: flex;

  @media ${device.laptopL} {
    flex-direction: column;
  }
`;

const Image = styled.img`
  margin: 0 20px 0 15px;
  object-fit: fill;
  cursor: pointer;

  @media ${device.laptopL} {
    margin: 28px 0;
  }

  @media ${device.laptop} {
    margin: 28px 0;
  }
`;

const Title = styled.span`
  display: -webkit-box;

  font-weight: 400;
  font-size: 20px;
  width: 460px;
  height: 44px;

  width: calc(100%-120px);
  text-overflow: ellipsis;
  word-break: break-word;

  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
  letter-spacing: 0.5px;

  color: ${theme.colors.primaryBlack};
  cursor: pointer;

  @media ${device.laptopL} {
    width: 100%;
    height: 58px;

    margin-bottom: 20px;

    font-size: 24px;
  }
`;

const RightInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;

  @media ${device.laptopL} {
    align-self: end;
  }
`;

const TrashLogo = styled.img`
  cursor: pointer;

  @media ${device.laptopL} {
    order: 3;
    height: 32px;
  }
`;

const Price = styled.span`
  display: -webkit-box;

  font-weight: 400;
  font-size: 16px;

  letter-spacing: 0.5px;

  width: 120px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  text-align: end;

  color: ${theme.colors.primaryBlack};

  @media ${device.laptopL} {
    width: 100%;
    order: 2;
    margin: 24px 0;
    font-size: 24px;
  }
`;

export default CartItem;
