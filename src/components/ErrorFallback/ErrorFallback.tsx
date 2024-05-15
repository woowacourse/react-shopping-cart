import * as S from './ErrorFallback.style'


//TODO : Errorcode 받아서 반환하는게 나을듯
const ErrorFallback = () => {
  return (
    <S.FallbackContainer>
      장바구니에 담은 상품이 없습니다.
    </S.FallbackContainer >
  )
}

export default ErrorFallback