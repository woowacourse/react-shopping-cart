import React from 'react';
import * as S from './NotificationMessage.styled';
import { NotificationIcon } from '../../asset';

interface NotificationMessageProps {
  message: string;
}

function NotificationMessage({ message }: NotificationMessageProps) {
  return (
    <S.InformationMsgContainer>
      <S.NotificationIconImg src={NotificationIcon} />
      <S.InformationMsg>{message}</S.InformationMsg>
    </S.InformationMsgContainer>
  );
}

export default NotificationMessage;
