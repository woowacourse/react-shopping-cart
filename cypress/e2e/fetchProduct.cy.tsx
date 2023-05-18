describe('장바구니 e2e 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/json-server-4140.onrender.com\/cart-itmes\/?.*/,
      },
      {
        fixture: 'mockProducts.json',
      },
    ).as('fetchProduct');

    cy.visit('http://localhost:3000/');
  });

  it('페이지에 접속하면 상품 목록(목 데이터) 8개를 렌더링한다.', () => {
    cy.get('[data-cy=product-item]').should('have.length', 8);
  });

  it('장바구니 버튼을 클릭하면 상품을 장바구니에 1개 추가한다.', () => {
    cy.get('[data-cy=add-cart').first().click();
    cy.get('[data-cy=cart-amount').should('contain', 1);
  });

  it('장바구니 버튼에 상품 개수를 12개로 수정 시 헤더의 장바구니에 개수가 반영된다.', () => {
    cy.get('[data-cy=add-cart').first().click();
    cy.get('input').type('2');
    cy.get('[data-cy=cart-amount').should('contain', 12);
  });
});
