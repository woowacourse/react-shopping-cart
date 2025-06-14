import styled from "@emotion/styled"

export const Container = styled.article`
  width: 100%;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid #0000001a;
`

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export const SelectButton = styled.button`
  border: none;

  width: 24px;
  height: 24px;
  cursor: pointer;
`

export const SelectIcon = styled.img`
  width: auto;
  height: auto;
`

export const DeleteButton = styled.button`
  width: 40px;
  height: 24px;

  color: #000000;
  background-color: transparent;
  border: 1px solid #0000001a;
  border-radius: 4px;
  font-size: 12px;

  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover,
  &:focus {
    background-color: #000000;
    color: #ffffff;
  }
`

export const Image = styled.img`
  width: 80px;
  height: 80px;

  border-radius: 8px;
`

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
`

export const ProductInfo = styled.div`
  width: 106px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

export const ProductName = styled.strong`
  font-size: 12px;
  font-weight: 500;
`

export const Price = styled.p`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 8px;
`
