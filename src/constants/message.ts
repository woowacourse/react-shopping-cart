export const MESSAGE = {
  error: {
    title: '에러가 발생했습니다.',
    description: '새로고침 해주세요.',
    imageSrc: 'images/error.png',
  },
  empty: {
    title: '상품을 찾을 수 없습니다.',
    description: '새로고침 해주세요.',
    imageSrc: 'images/error.png',
  },
  notFound: {
    title: '페이지를 찾을 수 없습니다.',
    description: '페이지가 존재하지 않거나 삭제되어 찾을 수 없어요.',
    imageSrc: 'images/error.png',
  },
  loading: {
    title: '로딩중입니다.',
    description: '잠시만 기다려주세요.',
    imageSrc: 'images/loading.png',
  },
  cartEmpty: {
    title: '장바구니에 상품이 없습니다.',
    description: '상품을 추가해보세요.',
    imageSrc: 'images/lay-down.png',
  },
} as const;

export type MessageKey = keyof typeof MESSAGE;
