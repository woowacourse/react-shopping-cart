describe('장바구니 e2e 테스트', () => {
	beforeEach(() => {
		cy.intercept({
			method: 'GET',
			url: 'https://json-server-4140.onrender.com/cart-itmes',
		}).as('getCartList');

		cy.visit('http://localhost:3000/react-shopping-cart');
	});

	it('페에지에 접속하면 서버에 있는 CARTLIST 데이터를 렌더링한다.', () => {
		cy.wait('@getCartList').then((interception) => {
			const cartList = interception.response?.body;
			cy.get('[data-cy=product-item]').should('have.length', cartList.length);
		});
	});

	it('장바구니 버튼을 클릭하면 상품을 장바구니에 1개 추가한다.', () => {
		cy.get('[data-cy=add-cart').first().children().click();
		cy.get('[data-cy=cart-amount').should('contain', 1);
	});

	it('장바구니 버튼을 클릭한 후 원하는 상품의 개수 만큼 장바구니에 담는다.', () => {
		cy.get('[data-cy=add-cart').first().children().click();
		cy.get('[data-cy=add-cart]').first().children().type('0');

		cy.get('[data-cy=cart-amount').should('contain', 10);
	});
});
