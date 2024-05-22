import React from 'react';
import * as S from './NotificationMessage.styled';
import { NotificationIcon } from '../../asset';

interface NotificationMessageProps {
  message: string;
}

function NotificationMessage({ message }: NotificationMessageProps) {
  return (
    <S.InformationMsg>
      <S.NotificationIconImg src={NotificationIcon} />
      {message}
    </S.InformationMsg>
  );
}

export default NotificationMessage;
