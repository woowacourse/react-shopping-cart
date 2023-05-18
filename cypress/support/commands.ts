/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    typingFirstProduct(type: string, assertion: string): Chainable<any>;
    clickCartButton(): Chainable<any>;
  }
}

Cypress.Commands.add('clickCartButton', () => {
  cy.get('ul').find('li').first().as('firstProductItem');
  cy.get('@firstProductItem').find('button').click();
});

Cypress.Commands.add(
  'typingFirstProduct',
  (type: string, assertion: string) => {
    cy.get('@firstProductItem').find('input').clear();
    cy.get('@firstProductItem').find('input').type(type);
    cy.get('@firstProductItem').find('input').should('have.value', assertion);
  }
);
