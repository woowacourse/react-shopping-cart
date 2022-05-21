const storage = {
  KEYS: {
    CART: 'CART_PRODUCT_ID',
  },

  setCookie(key, value) {
    document.cookie = key + '=' + encodeURIComponent(value);
  },

  getCookie(key) {
    const value = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return value ? decodeURIComponent(value[2]) : null;
  },

  getCartProductIds() {
    const idListCookie = this.getCookie(this.KEYS.CART);
    return idListCookie ? idListCookie.split(',') : [];
  },

  addCartProductId(productId) {
    let idListCookie = this.getCookie(this.KEYS.CART) ?? `${productId}`;

    if (!idListCookie.split(',').includes(`${productId}`)) {
      idListCookie += `,${productId}`;
    }

    this.setCookie(this.KEYS.CART, idListCookie);
  },

  removeCartProductId(productId) {
    const idListCookie = this.getCookie(this.KEYS.CART) ?? '';
    const idList = idListCookie.split(',');

    if (!idList.includes(`${productId}`)) return;

    const newIdList = idList.filter(id => id !== `${productId}`);
    this.setCookie(this.KEYS.CART, newIdList.join(','));
  },
};

export default storage;
