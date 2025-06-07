import styled from "@emotion/styled";

export default function EmptyText({ text }: { text: string }) {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 750px;
  font-size: 16px;
  font-weight: 400;
`;
