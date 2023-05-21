import { ProductItemData } from '../../src/types';
import { priceFormatter } from '../../src/utils/formatter';

const TEST_URL = 'http://localhost:3000/react-shopping-cart/';

describe('상품 목록 페이지 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
    cy.wait(3000);
  });

  it.skip('웹 페이지에 처음 방문 시 아이템 목록 데이터가 렌더링되기 전에 skeleton을 볼 수 있다.', () => {
    cy.clock();

    cy.visit(TEST_URL);

    cy.tick(4000);

    cy.get('.skeleton').should('be.visible');
  });

  it.skip('웹 페이지에 처음 방문 시 현재 판매 중인 아이템 목록을 볼 수 있다.', () => {
    cy.fixture('productData.json').then((expectedData) => {
      expectedData.forEach((productItem: ProductItemData) => {
        cy.get('ol').should('contain', productItem.name);
      });
    });
  });

  it.skip('현재 판매 중인 아이템 목록에서 각 아이템 마다 아이템 사진, 이름, 그리고 가격으로 불 수 있다..', () => {
    cy.fixture('productData.json').then((expectedData) => {
      cy.get('li').each((element, index) => {
        const productItem = expectedData[index];
        cy.wrap(element).should('contain', productItem.name);
        cy.wrap(element).should('contain', priceFormatter(productItem.price));
        cy.wrap(element).find('img').should('have.attr', 'src', productItem.imageUrl);
      });
    });
  });

  it.skip('웹 페이지 처음 방문 시 아이템 이미지 위에 "+" 버튼을 볼 수 있다.', () => {
    cy.get('li').each((element) => {
      cy.wrap(element).find('button[aria-label="add item"]').find('svg').should('exist');
    });
  });

  it.skip('아이템 이미지 위 "+" 버튼 클릭 시 아이템을 장바구니에 추가할 수 있는 모달을 볼 수 있다.', () => {
    cy.get('button[aria-label="add item"]').first().click();
    cy.get('[aria-modal]').find('div[aria-labelledby="modal title"]').should('be.visible');
  });

  it.skip('아이템 이미지 위 "+" 버튼 클릭 후 아이템 장바구니 추가 모달에서 수량을 스텝퍼 버튼으로 추가 후 "장바구니 담기" 버튼을 누르면 장바구니에 추가된 후 헤더 장바구니 아이콘 숫자가 증감된다.', () => {
    cy.get('button[aria-label="add item"]').first().click();
    cy.get('[aria-modal]').find('div[aria-labelledby="modal title"]').should('be.visible');

    cy.get('button[aria-label="increase count"]').click().click();
    cy.get('input[aria-label="count input"]').should('have.value', 3);
    cy.get('button[aria-label="add to cart"]').click();

    cy.get('button[aria-label="cart"]').find('span').should('contain', 1);
  });

  it.skip('아이템 이미지 위 "+" 버튼 클릭 후 아이템 장바구니 추가 모달에서 수량을 스텝퍼 버튼으로 추가 후 "장바구니 담기" 버튼을 누르면 하단에 "장바구니에 상품을 추가했습니다"라는 메세지를 볼 수 있다.', () => {
    cy.get('button[aria-label="add item"]').first().click();
    cy.get('[aria-modal]').find('div[aria-labelledby="modal title"]').should('be.visible');

    cy.get('button[aria-label="increase count"]').click().click();
    cy.get('input[aria-label="count input"]').should('have.value', 3);
    cy.get('button[aria-label="add to cart"]').click();

    cy.get('[role="alert"]').should('contain', '장바구니에 상품을 추가했습니다');
  });

  it.skip('아이템 이미지 위 "+" 버튼 클릭 후 아이템 장바구니 추가 모달에서 수량을 스텝퍼 버튼으로 추가 후 이미지 위 "+" 버튼이 수량을 표시하고 있는 버튼으로 변경된다.', () => {
    cy.get('button[aria-label="add item"]').first().find('svg').should('exist');
    cy.get('button[aria-label="add item"]').first().click();
    cy.get('[aria-modal]').find('div[aria-labelledby="modal title"]').should('be.visible');

    cy.get('button[aria-label="increase count"]').click().click();
    cy.get('input[aria-label="count input"]').should('have.value', 3);
    cy.get('button[aria-label="add to cart"]').click();

    cy.get('button[aria-label="add item"]').first().find('svg').should('not.exist');
    cy.get('button[aria-label="add item"]').first().should('contain', 3);
  });
});
