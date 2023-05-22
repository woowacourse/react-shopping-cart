import { SHIPPING_FEE } from '../../src/constants';
import { PATH } from '../../src/constants/path';
import { ProductItemData } from '../../src/types';
import { priceFormatter } from '../../src/utils/formatter';

const TEST_URL = 'http://localhost:3000/react-shopping-cart';

describe('상품 목록 페이지 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
    cy.wait(3000);
  });

  it('웹 페이지에 처음 방문 시 상품 목록 데이터가 렌더링되기 전에 skeleton을 볼 수 있다.', () => {
    cy.clock();

    cy.visit(TEST_URL);

    cy.tick(4000);

    cy.get('.skeleton').should('be.visible');
  });

  it('웹 페이지에 처음 방문 시 현재 판매 중인 상품 목록을 볼 수 있다.', () => {
    cy.fixture('productData.json').then((expectedData) => {
      expectedData.forEach((productItem: ProductItemData) => {
        cy.get('ol').should('contain', productItem.name);
      });
    });
  });

  it('현재 판매 중인 상품 목록에서 각 상품 마다 상품 사진, 이름, 그리고 가격으로 불 수 있다..', () => {
    cy.fixture('productData.json').then((expectedData) => {
      cy.get('li').each((element, index) => {
        const productItem = expectedData[index];
        cy.wrap(element).should('contain', productItem.name);
        cy.wrap(element).should('contain', priceFormatter(productItem.price));
        cy.wrap(element).find('img').should('have.attr', 'src', productItem.imageUrl);
      });
    });
  });

  it('웹 페이지 처음 방문 시 상품 이미지 위에 "+" 버튼을 볼 수 있다.', () => {
    cy.get('li').each((element) => {
      cy.wrap(element).find('button[aria-label="상품 추가"]').find('svg').should('exist');
    });
  });

  it('상품 이미지 위 "+" 버튼 클릭 시 상품을 장바구니에 추가할 수 있는 모달을 볼 수 있다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();
    cy.get('[aria-modal]').find('div[aria-labelledby="modal-title"]').should('be.visible');
  });

  it('상품 이미지 위 "+" 버튼 클릭 후 상품 장바구니 추가 모달에서 수량을 스텝퍼 버튼으로 추가 후 "장바구니 담기" 버튼을 누르면 장바구니에 추가된 후 헤더 장바구니 아이콘 숫자가 증감된다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();
    cy.get('[aria-modal]').find('div[aria-labelledby="modal-title"]').should('be.visible');

    cy.get('button[aria-label="카운트 증가"]').click().click();
    cy.get('input[aria-label="카운트 입력"]').should('have.value', 3);
    cy.findByText('장바구니 담기', { selector: 'button' }).click();

    cy.get('button[aria-labelledby="cart-button"]').find('span').should('contain', 1);
  });

  it('상품 이미지 위 "+" 버튼 클릭 후 상품 장바구니 추가 모달에서 수량을 스텝퍼 버튼으로 추가 후 "장바구니 담기" 버튼을 누르면 하단에 "장바구니에 상품을 추가했습니다"라는 메세지를 볼 수 있다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();
    cy.get('[aria-modal]').find('div[aria-labelledby="modal-title"]').should('be.visible');

    cy.get('button[aria-label="카운트 증가"]').click().click();
    cy.get('input[aria-label="카운트 입력"]').should('have.value', 3);
    cy.findByText('장바구니 담기', { selector: 'button' }).click();

    cy.get('[role="alert"]').should('contain', '장바구니에 상품을 추가했습니다');
  });

  it('상품 이미지 위 "+" 버튼 클릭 후 상품 장바구니 추가 모달에서 수량을 스텝퍼 버튼으로 추가 후 이미지 위 "+" 버튼이 수량을 표시하고 있는 버튼으로 변경된다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().find('svg').should('exist');
    cy.get('button[aria-label="상품 추가"]').first().click();
    cy.get('[aria-modal]').find('div[aria-labelledby="modal-title"]').should('be.visible');

    cy.get('button[aria-label="카운트 증가"]').click().click();
    cy.get('input[aria-label="카운트 입력"]').should('have.value', 3);
    cy.findByText('장바구니 담기', { selector: 'button' }).click();

    cy.get('button[aria-label="상품 추가"]').first().find('svg').should('not.exist');
    cy.get('button[aria-label="상품 추가"]').first().should('contain', 3);
  });
});

describe('장바구니 페이지 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
    cy.wait(3000);
  });

  it('장바구니에 상품이 없는 경우 장바구니에 담긴 상품이 없다는 메세지를 볼 수 있고 "홈으로 이동하기" 버튼을 눌러서 상품 목록 페이지로 이동할 수 있다.', () => {
    cy.get('button[aria-labelledby="cart-button"]').click();
    cy.wait(3000);

    cy.get('section').should('contain.text', '장바구니에 담긴 상품이 없습니다.');

    cy.findByText('홈으로 이동하기', { selector: 'button' }).should('be.visible');
    cy.findByText('홈으로 이동하기', { selector: 'button' }).should(
      'contain.text',
      '홈으로 이동하기'
    );
    cy.findByText('홈으로 이동하기', { selector: 'button' }).click();

    cy.url().should('eq', TEST_URL);
  });

  it('상품 목록 페이지에서 상품을 추가하면 장바구니 페이지에서 추가된 상품을 볼 수 있다.', () => {
    cy.fixture('productData.json').then((expectedData) => {
      cy.get('li').first().should('contain', expectedData[0].name);
      cy.get('button[aria-label="상품 추가"]').first().click();

      cy.get('button[aria-label="카운트 증가"]').click().click();
      cy.findByText('장바구니 담기', { selector: 'button' }).click();

      cy.get('button[aria-labelledby="cart-button"]').click();

      cy.get('li').first().should('contain', expectedData[0].name);
    });
  });

  it('장바구니 페이지에서 추가된 상품에 대해서 스텝퍼 버튼을 눌러서 수량을 증가시킬 수 있다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();

    cy.get('button[aria-label="카운트 증가"]').click().click();
    cy.findByText('장바구니 담기', { selector: 'button' }).click();

    cy.get('button[aria-labelledby="cart-button"]').click();

    cy.get('li').find('button[aria-label="카운트 증가"]').click();
    cy.get('li').find('input[aria-label="카운트 입력"]').should('have.value', 4);
  });

  it('장바구니 페이지에서 추가된 상품에 대해서 스텝퍼 버튼을 눌러서 수량을 감소시킬 수 있다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();

    cy.get('button[aria-label="카운트 증가"]').click().click();
    cy.findByText('장바구니 담기', { selector: 'button' }).click();

    cy.get('button[aria-labelledby="cart-button"]').click();

    cy.get('li').find('button[aria-label="카운트 감소"]').click().click();
    cy.get('li').find('input[aria-label="카운트 입력"]').should('have.value', 1);
  });

  it('장바구니 페이지에서 추가된 상품에 대해서 스텝퍼 버튼을 눌러서 수량을 변경시킬 시 장바구니 결제 박스에서 총 상품 가격과 결제 예상 금액이 현재 수량에 맞춰서 변한다.', () => {
    cy.fixture('productData.json').then((expectedData) => {
      cy.get('button[aria-label="상품 추가"]').first().click();

      cy.findByText('장바구니 담기', { selector: 'button' }).click();

      cy.get('button[aria-labelledby="cart-button"]').click();

      cy.get('li').first().should('contain', priceFormatter(expectedData[0].price));

      cy.get('li').find('button[aria-label="카운트 증가"]').click().click();
      cy.get('li').find('input[aria-label="카운트 입력"]').should('have.value', 3);
      cy.get('li')
        .first()
        .should('contain', priceFormatter(expectedData[0].price * 3));

      cy.get('aside').should('contain', priceFormatter(expectedData[0].price * 3));
      cy.get('aside').should('contain', priceFormatter(expectedData[0].price * 3 + SHIPPING_FEE));
    });
  });

  it('상품 목록 페이지에서 상품 추가 후 장바구니 페이지 방문 시 추가된 상품들이 전체 선택되어 있다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();
    cy.findByText('장바구니 담기', { selector: 'button' }).click();

    cy.get('button[aria-label="상품 추가"]').eq(2).click();
    cy.findByText('장바구니 담기', { selector: 'button' }).click();

    cy.get('button[aria-labelledby="cart-button"]').click();

    cy.get('main').find('header').should('contain', '(2/2)');
  });

  it('장바구니에 추가된 상품을 개별적으로 선택하지 않을 수 있다. 그럼 상단 "전체 선택" 정보에 현재 장바구니에 있는 상품 개수 중 현재 선택된 상품 수량만 표시되고 전체 선택이 해지된다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();
    cy.findByText('장바구니 담기', { selector: 'button' }).click();

    cy.get('button[aria-label="상품 추가"]').eq(2).click();
    cy.findByText('장바구니 담기', { selector: 'button' }).click();

    cy.get('button[aria-labelledby="cart-button"]').click();
    cy.get('main').find('header').should('contain', '(2/2)');

    cy.get('li').first().find('label').click({ multiple: true });
    cy.get('main').find('header').should('contain', '(1/2)');
  });

  it('장바구니에 추가된 상품을 개별적으로 삭제할 수 있다. 삭제하기 전에 삭제하기 전에 삭제 여부를 재차 확인하는 모달을 볼 수 있다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();
    cy.findByText('장바구니 담기', { selector: 'button' }).click();

    cy.get('button[aria-label="상품 추가"]').eq(2).click();
    cy.findByText('장바구니 담기', { selector: 'button' }).click();

    cy.get('button[aria-labelledby="cart-button"]').click();
    cy.get('main').find('header').should('contain', '(2/2)');

    cy.get('button[aria-label="상품 삭제"]').first().click();
    cy.get('[aria-modal]').find('div[aria-describedby="modal-description"]').should('be.visible');

    cy.findByText('삭제', { selector: 'button' }).click();
    cy.get('main').find('header').should('contain', '(1/1)');
  });

  it('장바구니에 추가된 상품들 중 체크된 상품들을 "선택삭제"를 클릭해서 일괄 삭제할 수 있다. 삭제하기 전에 삭제하기 전에 삭제 여부를 재차 확인하는 모달을 볼 수 있다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();
    cy.findByText('장바구니 담기', { selector: 'button' }).click();

    cy.get('button[aria-label="상품 추가"]').eq(2).click();
    cy.findByText('장바구니 담기', { selector: 'button' }).click();

    cy.get('button[aria-labelledby="cart-button"]').click();
    cy.get('main').find('header').should('contain', '(2/2)');

    cy.findByText('선택삭제', { selector: 'button' }).first().click();
    cy.get('[aria-modal]').find('div[aria-describedby="modal-description"]').should('be.visible');

    cy.findByText('삭제', { selector: 'button' }).click();
    cy.get('main').find('header').should('contain', '(0/0)');

    cy.findByText('선택삭제', { selector: 'button' }).should('have.attr', 'disabled');
    cy.get('section').should('contain.text', '장바구니에 담긴 상품이 없습니다.');
  });

  it('장바구니에 상품을 추가한 후 새로고침해도 장바구니 페이지에서 추가했던 상품을 볼 수 있다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();
    cy.findByText('장바구니 담기', { selector: 'button' }).click();

    cy.get('button[aria-label="상품 추가"]').eq(2).click();
    cy.findByText('장바구니 담기', { selector: 'button' }).click();

    cy.get('button[aria-labelledby="cart-button"]').click();
    cy.get('main').find('header').should('contain', '(2/2)');

    cy.reload();

    cy.visit(`${TEST_URL}${PATH.CARTS}`);
    cy.wait(3000);

    cy.get('main').find('header').should('contain', '(2/2)');
  });
});
