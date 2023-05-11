describe("개별 상품 장바구니 추가 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/");
  });

  it("장바구니 아이콘을 클릭했을 때 수량 카운터와 장바구니 추가버튼이 나타난다.", () => {
    cy.get("ul").find("li").first().as("firstProductItem");

    cy.get("@firstProductItem").find("button").click();

    cy.get("@firstProductItem").find("input").should("be.visible");

    cy.get("@firstProductItem")
      .find("button")
      .should("have.text", "장바구니 추가")
      .should("be.visible");
  });

  it("장바구니 수량 카운터에 자연수를 입력할 수 있다.", () => {
    cy.get("ul").find("li").first().as("firstProductItem");

    cy.get("@firstProductItem").find("button").click();

    cy.get("@firstProductItem").find("input").clear();
    cy.get("@firstProductItem").find("input").type("12");
    cy.get("@firstProductItem").find("input").should("have.value", "12");
  });

  it("장바구니 수량 카운터에 영어는 입력되지 않는다.", () => {
    cy.get("ul").find("li").first().as("firstProductItem");

    cy.get("@firstProductItem").find("button").click();

    cy.get("@firstProductItem").find("input").clear();
    cy.get("@firstProductItem").find("input").type("nave");
    cy.get("@firstProductItem").find("input").should("have.value", "");
  });

  it("장바구니 수량 카운터에 한국어는 입력되지 않는다.", () => {
    cy.get("ul").find("li").first().as("firstProductItem");

    cy.get("@firstProductItem").find("button").click();

    cy.get("@firstProductItem").find("input").clear();
    cy.get("@firstProductItem").find("input").type("네이브");
    cy.get("@firstProductItem").find("input").should("have.value", "");
  });

  it("장바구니 수량 카운터에 숫자 기호도 입력되지 않는다.", () => {
    cy.get("ul").find("li").first().as("firstProductItem");

    cy.get("@firstProductItem").find("button").click();

    cy.get("@firstProductItem").find("input").clear();
    cy.get("@firstProductItem").find("input").type("+");
    cy.get("@firstProductItem").find("input").should("have.value", "");

    cy.get("@firstProductItem").find("input").clear();
    cy.get("@firstProductItem").find("input").type("-");
    cy.get("@firstProductItem").find("input").should("have.value", "");
  });

  it("장바구니 수량 카운터에 아무것도 입력되지않고 blur 되면 기본 값으로 설정한다.", () => {
    cy.get("ul").find("li").first().as("firstProductItem");

    cy.get("@firstProductItem").find("button").click();

    cy.get("@firstProductItem").find("input").clear().blur();
    cy.get("@firstProductItem").find("input").should("have.value", "1");
  });
});

describe("장바구니 수량 변경 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/");
  });

  it("상품을 장바구니에 추가하면 수량이 증가한다.", () => {
    cy.get("ul").find("li").first().as("firstProductItem");

    cy.get("@firstProductItem").find("button").click();

    cy.get("@firstProductItem").find("button").last().click();

    cy.get("header").find(".sc-gueYoa").should("have.text", "1");
  });

  it("이미 등록된 상품을 추가하면 수량은 변경되지 않는다.", () => {
    cy.get("ul").find("li").first().as("firstProductItem");

    cy.get("@firstProductItem").find("button").click();
    cy.get("@firstProductItem").find("button").last().click();

    cy.get("@firstProductItem").find("button").click();
    cy.get("@firstProductItem").find("button").last().click();

    cy.get("header").find(".sc-gueYoa").should("have.text", "1");
  });
});
