import * as Styled from "./CartList.style"

import { PropsWithChildren } from "react"

function CartList({ children }: PropsWithChildren) {
  return (
    <Styled.Container>
      <Styled.UlContainer>{children}</Styled.UlContainer>
    </Styled.Container>
  )
}

export default CartList
