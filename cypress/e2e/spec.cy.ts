describe('정상 작동 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.get('[data-cy="productItem"]').first().as('firstProductItem');
  });

  it('페이지를 접속하면 헤더가 정상적으로 출력된다. ', () => {
    cy.get('[data-cy="headerlogo"]').should('be.visible');
    cy.get('[data-cy="headerlogo"]').should('have.text', 'SHOP');
  });

  it('카드 장바구니 버튼 클릭 시 장바구니에 담긴 물품 종류 개수가 헤더에 표시된다.', () => {
    cy.get('@firstProductItem').find('button').click();
    cy.get('@firstProductItem').find('input').should('be.visible');
    cy.get('@firstProductItem').find('input').should('have.value', '1');

    cy.get('@firstProductItem').next().find('button').click();

    cy.get('[data-cy="totalQuantity"]').should('have.text', '2');
  });
});
