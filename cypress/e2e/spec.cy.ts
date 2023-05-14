describe('정상 작동 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy="productItem"]').first().as('firstProductItem');
  });

  it('페이지를 접속하면 헤더가 정상적으로 출력된다. ', () => {
    cy.get('[data-cy="headerlogo"]').should('be.visible');
    cy.get('[data-cy="headerlogo"]').should('have.text', 'SHOP');
  });

  it('카드 장바구니 버튼 클릭 시 stepper Input이 정상적으로 출력된다.', () => {
    cy.get('@firstProductItem').find('button').click();
    cy.get('@firstProductItem').find('input').should('be.visible');
    cy.get('@firstProductItem').find('input').should('have.value', '1');
    cy.get('@firstProductItem').find('input').type('0');

    cy.get('[data-cy="totalQuantity"]').should('have.text', '10');
  });
});
