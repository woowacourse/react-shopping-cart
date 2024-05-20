import React from 'react';
import { Container, Message } from './style';

export default function Fallback({
  spinner,
  message,
}: {
  spinner?: React.ReactNode;
  message?: string;
}) {
  return (
    <Container>
      {spinner}
      {message && <Message>{message}</Message>}
    </Container>
  );
}
