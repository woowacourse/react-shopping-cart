/// <reference types="cypress" />

Cypress.Commands.add("firstProductItem", () => {
  cy.get("ul").find("li").first();
});
