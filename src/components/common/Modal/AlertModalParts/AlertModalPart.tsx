import { TextAlign } from '@appTypes/index';

import * as Styled from './AlertModalParts.styled';

const AlertModalPart = () => {};

const ConfirmButton = ({ text }: { text: string }) => {
  return <Styled.AlertModalButton>{text}</Styled.AlertModalButton>;
};

interface AlertModalContentsProps {
  message: string;
  $textAlign?: TextAlign;
}
const Contents = ({ message, $textAlign = 'left' }: AlertModalContentsProps) => {
  const textArray = message.split('/n');

  return (
    <>
      {textArray.map((text) => (
        <Styled.AlertModalContentsText $textAlign={$textAlign}>{text}</Styled.AlertModalContentsText>
      ))}
    </>
  );
};

AlertModalPart.Contents = Contents;
AlertModalPart.ConfirmButton = ConfirmButton;

export default AlertModalPart;
