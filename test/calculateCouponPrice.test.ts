import { Coupon } from '../src/types/coupon';
import { calculateCouponPrice } from '../src/domain/calculateCouponPrice';

describe('calculateCouponPrice 함수 테스트', () => {
  const coupons: Coupon[] = [
    {
      id: 1,
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      expirationDate: '2025-11-30',
      discount: 5000,
      minimumAmount: 100000,
      discountType: 'fixed',
    },
    {
      id: 2,
      code: 'BOGO',
      description: '2개 구매 시 1개 무료 쿠폰',
      expirationDate: '2025-06-30',
      buyQuantity: 2,
      getQuantity: 1,
      discountType: 'buyXgetY',
    },
    {
      id: 3,
      code: 'FREESHIPPING',
      description: '5만원 이상 구매 시 무료 배송 쿠폰',
      expirationDate: '2025-08-31',
      minimumAmount: 50000,
      discountType: 'freeShipping',
    },
    {
      id: 4,
      code: 'MIRACLESALE',
      description: '미라클모닝 30% 할인 쿠폰',
      expirationDate: '2025-07-31',
      discount: 30,
      availableTime: {
        start: '04:00:00',
        end: '07:00:00',
      },
      discountType: 'percentage',
    },
  ];

  it('만료일이 지난 쿠폰은 적용되지 않는다.', () => {
    const selectedCartItems = [
      {
        id: 13117,
        quantity: 7,
        product: {
          id: 28,
          name: '아샷추',
          price: 3800,
          imageUrl:
            'https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2023/12/%EC%95%84%EC%83%B7%EC%B6%94%EC%95%84%EC%9D%B4%EC%8A%A4%ED%8B%B0%EC%83%B7%EC%B6%94%EC%B9%B4%EB%94%94%EC%B9%B4%ED%8E%98%EC%9D%B8_1.png',
          category: '식료품',
        },
      },
      {
        id: 13121,
        quantity: 2,
        product: {
          id: 137,
          name: '[빙그래] 요맘때 파인트 710mL 3종 (택1)',
          price: 5000,
          imageUrl:
            'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/73061aab-a2e2-443a-b0f9-f19b7110045e.jpg',
          category: '공백제이',
        },
      },
      {
        id: 14795,
        quantity: 5,
        product: {
          id: 152,
          name: '[소반옥] 왕갈비탕 1kg',
          price: 11900,
          imageUrl:
            'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/860123d3-be82-4c90-ae47-0b56e2869eca.jpg',
          category: '공백제이',
        },
      },
    ];
    const result = calculateCouponPrice({
      selectedCoupons: [coupons[0]],
      selectedCartItems,
      deliveryFee: 3000,
      nowDate: new Date('2010-02-10'),
    });

    expect(result).toBe(0);
  });
  it('복수의 유효한 쿠폰이 적용되면 합산된 할인 금액을 반환한다.', () => {
    const selectedCartItems = [
      {
        id: 13117,
        quantity: 7,
        product: {
          id: 28,
          name: '아샷추',
          price: 3800,
          imageUrl:
            'https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2023/12/%EC%95%84%EC%83%B7%EC%B6%94%EC%95%84%EC%9D%B4%EC%8A%A4%ED%8B%B0%EC%83%B7%EC%B6%94%EC%B9%B4%EB%94%94%EC%B9%B4%ED%8E%98%EC%9D%B8_1.png',
          category: '식료품',
        },
      },
      {
        id: 13121,
        quantity: 5,
        product: {
          id: 137,
          name: '[빙그래] 요맘때 파인트 710mL 3종 (택1)',
          price: 5000,
          imageUrl:
            'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/73061aab-a2e2-443a-b0f9-f19b7110045e.jpg',
          category: '공백제이',
        },
      },
    ];
    const result = calculateCouponPrice({
      selectedCoupons: [coupons[1], coupons[2]],
      selectedCartItems,
      deliveryFee: 3000,
      nowDate: new Date(),
    });

    expect(result).toBe(10600);
  });

  describe('"5000원 할인 쿠폰" 적용 테스트', () => {
    it('100,000원 미만일 경우 쿠폰이 적용되지 않는다.', () => {
      const selectedCartItems = [
        {
          id: 13117,
          quantity: 7,
          product: {
            id: 28,
            name: '아샷추',
            price: 3800,
            imageUrl:
              'https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2023/12/%EC%95%84%EC%83%B7%EC%B6%94%EC%95%84%EC%9D%B4%EC%8A%A4%ED%8B%B0%EC%83%B7%EC%B6%94%EC%B9%B4%EB%94%94%EC%B9%B4%ED%8E%98%EC%9D%B8_1.png',
            category: '식료품',
          },
        },
        {
          id: 13121,
          quantity: 2,
          product: {
            id: 137,
            name: '[빙그래] 요맘때 파인트 710mL 3종 (택1)',
            price: 5000,
            imageUrl:
              'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/73061aab-a2e2-443a-b0f9-f19b7110045e.jpg',
            category: '공백제이',
          },
        },
        {
          id: 14795,
          quantity: 5,
          product: {
            id: 152,
            name: '[소반옥] 왕갈비탕 1kg',
            price: 11900,
            imageUrl:
              'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/860123d3-be82-4c90-ae47-0b56e2869eca.jpg',
            category: '공백제이',
          },
        },
      ];
      const result = calculateCouponPrice({
        selectedCoupons: [coupons[0]],
        selectedCartItems,
        deliveryFee: 3000,
        nowDate: new Date(),
      });

      expect(result).toBe(0);
    });

    it('100,000원 이상일 경우 5000원을 반환한다.', () => {
      const selectedCartItems = [
        {
          id: 13117,
          quantity: 7,
          product: {
            id: 28,
            name: '아샷추',
            price: 3800,
            imageUrl:
              'https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2023/12/%EC%95%84%EC%83%B7%EC%B6%94%EC%95%84%EC%9D%B4%EC%8A%A4%ED%8B%B0%EC%83%B7%EC%B6%94%EC%B9%B4%EB%94%94%EC%B9%B4%ED%8E%98%EC%9D%B8_1.png',
            category: '식료품',
          },
        },
        {
          id: 13121,
          quantity: 2,
          product: {
            id: 137,
            name: '[빙그래] 요맘때 파인트 710mL 3종 (택1)',
            price: 5000,
            imageUrl:
              'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/73061aab-a2e2-443a-b0f9-f19b7110045e.jpg',
            category: '공백제이',
          },
        },
        {
          id: 14795,
          quantity: 6,
          product: {
            id: 152,
            name: '[소반옥] 왕갈비탕 1kg',
            price: 11900,
            imageUrl:
              'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/860123d3-be82-4c90-ae47-0b56e2869eca.jpg',
            category: '공백제이',
          },
        },
      ];
      const result = calculateCouponPrice({
        selectedCoupons: [coupons[0]],
        selectedCartItems,
        deliveryFee: 3000,
        nowDate: new Date(),
      });

      expect(result).toBe(5000);
    });
  });

  describe('"2개 구매 시 1개 무료 쿠폰" 적용 테스트', () => {
    it('모든 물건이 3개 미만일 경우 쿠폰이 적용되지 않는다.', () => {
      const selectedCartItems = [
        {
          id: 13117,
          quantity: 2,
          product: {
            id: 28,
            name: '아샷추',
            price: 3800,
            imageUrl:
              'https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2023/12/%EC%95%84%EC%83%B7%EC%B6%94%EC%95%84%EC%9D%B4%EC%8A%A4%ED%8B%B0%EC%83%B7%EC%B6%94%EC%B9%B4%EB%94%94%EC%B9%B4%ED%8E%98%EC%9D%B8_1.png',
            category: '식료품',
          },
        },
        {
          id: 13121,
          quantity: 2,
          product: {
            id: 137,
            name: '[빙그래] 요맘때 파인트 710mL 3종 (택1)',
            price: 5000,
            imageUrl:
              'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/73061aab-a2e2-443a-b0f9-f19b7110045e.jpg',
            category: '공백제이',
          },
        },
        {
          id: 14795,
          quantity: 2,
          product: {
            id: 152,
            name: '[소반옥] 왕갈비탕 1kg',
            price: 11900,
            imageUrl:
              'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/860123d3-be82-4c90-ae47-0b56e2869eca.jpg',
            category: '공백제이',
          },
        },
      ];
      const result = calculateCouponPrice({
        selectedCoupons: [coupons[1]],
        selectedCartItems,
        deliveryFee: 3000,
        nowDate: new Date(),
      });

      expect(result).toBe(0);
    });

    it('물건이 3개 이상일 경우 쿠폰이 1개 값을 반환한다.', () => {
      const selectedCartItems = [
        {
          id: 13117,
          quantity: 3,
          product: {
            id: 28,
            name: '아샷추',
            price: 3800,
            imageUrl:
              'https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2023/12/%EC%95%84%EC%83%B7%EC%B6%94%EC%95%84%EC%9D%B4%EC%8A%A4%ED%8B%B0%EC%83%B7%EC%B6%94%EC%B9%B4%EB%94%94%EC%B9%B4%ED%8E%98%EC%9D%B8_1.png',
            category: '식료품',
          },
        },
        {
          id: 13121,
          quantity: 2,
          product: {
            id: 137,
            name: '[빙그래] 요맘때 파인트 710mL 3종 (택1)',
            price: 5000,
            imageUrl:
              'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/73061aab-a2e2-443a-b0f9-f19b7110045e.jpg',
            category: '공백제이',
          },
        },
        {
          id: 14795,
          quantity: 2,
          product: {
            id: 152,
            name: '[소반옥] 왕갈비탕 1kg',
            price: 11900,
            imageUrl:
              'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/860123d3-be82-4c90-ae47-0b56e2869eca.jpg',
            category: '공백제이',
          },
        },
      ];
      const result = calculateCouponPrice({
        selectedCoupons: [coupons[1]],
        selectedCartItems,
        deliveryFee: 3000,
        nowDate: new Date(),
      });

      expect(result).toBe(3800);
    });

    it('3개 이상인 물건이 여러개인 경우 가장 큰 값을 반환한다.', () => {
      const selectedCartItems = [
        {
          id: 13117,
          quantity: 7,
          product: {
            id: 28,
            name: '아샷추',
            price: 3800,
            imageUrl:
              'https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2023/12/%EC%95%84%EC%83%B7%EC%B6%94%EC%95%84%EC%9D%B4%EC%8A%A4%ED%8B%B0%EC%83%B7%EC%B6%94%EC%B9%B4%EB%94%94%EC%B9%B4%ED%8E%98%EC%9D%B8_1.png',
            category: '식료품',
          },
        },
        {
          id: 13121,
          quantity: 2,
          product: {
            id: 137,
            name: '[빙그래] 요맘때 파인트 710mL 3종 (택1)',
            price: 5000,
            imageUrl:
              'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/73061aab-a2e2-443a-b0f9-f19b7110045e.jpg',
            category: '공백제이',
          },
        },
        {
          id: 14795,
          quantity: 6,
          product: {
            id: 152,
            name: '[소반옥] 왕갈비탕 1kg',
            price: 11900,
            imageUrl:
              'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/860123d3-be82-4c90-ae47-0b56e2869eca.jpg',
            category: '공백제이',
          },
        },
      ];

      const result = calculateCouponPrice({
        selectedCoupons: [coupons[1]],
        selectedCartItems,
        deliveryFee: 3000,
        nowDate: new Date(),
      });

      expect(result).toBe(23800);
    });
  });

  describe('"5만원 이상 구매 시 무료 배송 쿠폰" 적용 테스트', () => {
    it('50,000원 미만일 경우 쿠폰이 적용되지 않는다.', () => {
      const selectedCartItems = [
        {
          id: 13117,
          quantity: 7,
          product: {
            id: 28,
            name: '아샷추',
            price: 3800,
            imageUrl:
              'https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2023/12/%EC%95%84%EC%83%B7%EC%B6%94%EC%95%84%EC%9D%B4%EC%8A%A4%ED%8B%B0%EC%83%B7%EC%B6%94%EC%B9%B4%EB%94%94%EC%B9%B4%ED%8E%98%EC%9D%B8_1.png',
            category: '식료품',
          },
        },
      ];

      const result = calculateCouponPrice({
        selectedCoupons: [coupons[2]],
        selectedCartItems,
        deliveryFee: 3000,
        nowDate: new Date(),
      });

      expect(result).toBe(0);
    });

    it('50,000원 이상이며 도서 산간이 아닌 경우 3000원을 반환한다.', () => {
      const selectedCartItems = [
        {
          id: 13117,
          quantity: 7,
          product: {
            id: 28,
            name: '아샷추',
            price: 3800,
            imageUrl:
              'https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2023/12/%EC%95%84%EC%83%B7%EC%B6%94%EC%95%84%EC%9D%B4%EC%8A%A4%ED%8B%B0%EC%83%B7%EC%B6%94%EC%B9%B4%EB%94%94%EC%B9%B4%ED%8E%98%EC%9D%B8_1.png',
            category: '식료품',
          },
        },
        {
          id: 13121,
          quantity: 5,
          product: {
            id: 137,
            name: '[빙그래] 요맘때 파인트 710mL 3종 (택1)',
            price: 5000,
            imageUrl:
              'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/73061aab-a2e2-443a-b0f9-f19b7110045e.jpg',
            category: '공백제이',
          },
        },
      ];
      const result = calculateCouponPrice({
        selectedCoupons: [coupons[2]],
        selectedCartItems,
        deliveryFee: 3000,
        nowDate: new Date(),
      });

      expect(result).toBe(3000);
    });
    it('50,000원 이상이며 도서 산간인 아닌 경우 6000원을 반환한다.', () => {
      const selectedCartItems = [
        {
          id: 13117,
          quantity: 7,
          product: {
            id: 28,
            name: '아샷추',
            price: 3800,
            imageUrl:
              'https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2023/12/%EC%95%84%EC%83%B7%EC%B6%94%EC%95%84%EC%9D%B4%EC%8A%A4%ED%8B%B0%EC%83%B7%EC%B6%94%EC%B9%B4%EB%94%94%EC%B9%B4%ED%8E%98%EC%9D%B8_1.png',
            category: '식료품',
          },
        },
        {
          id: 13121,
          quantity: 5,
          product: {
            id: 137,
            name: '[빙그래] 요맘때 파인트 710mL 3종 (택1)',
            price: 5000,
            imageUrl:
              'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/73061aab-a2e2-443a-b0f9-f19b7110045e.jpg',
            category: '공백제이',
          },
        },
      ];
      const result = calculateCouponPrice({
        selectedCoupons: [coupons[2]],
        selectedCartItems,
        deliveryFee: 6000,
        nowDate: new Date(),
      });

      expect(result).toBe(6000);
    });
  });

  describe('"미라클모닝 30% 할인 쿠폰" 적용 테스트', () => {
    it.each([
      [new Date('2025-06-09T03:59:59+09:00')],
      [new Date('2025-06-09T07:00:01+09:00')],
    ])(
      '시작시간과 끝시간 사이에 있지 않은 경우 쿠폰이 적용되지 않는다.',
      (nowDate) => {
        const selectedCartItems = [
          {
            id: 13117,
            quantity: 7,
            product: {
              id: 28,
              name: '아샷추',
              price: 3800,
              imageUrl:
                'https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2023/12/%EC%95%84%EC%83%B7%EC%B6%94%EC%95%84%EC%9D%B4%EC%8A%A4%ED%8B%B0%EC%83%B7%EC%B6%94%EC%B9%B4%EB%94%94%EC%B9%B4%ED%8E%98%EC%9D%B8_1.png',
              category: '식료품',
            },
          },
          {
            id: 13121,
            quantity: 5,
            product: {
              id: 137,
              name: '[빙그래] 요맘때 파인트 710mL 3종 (택1)',
              price: 5000,
              imageUrl:
                'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/73061aab-a2e2-443a-b0f9-f19b7110045e.jpg',
              category: '공백제이',
            },
          },
        ];
        const result = calculateCouponPrice({
          selectedCoupons: [coupons[3]],
          selectedCartItems,
          deliveryFee: 3000,
          nowDate,
        });

        expect(result).toBe(0);
      }
    );

    it.each([
      [new Date('2025-06-09T04:00:00+09:00')],
      [new Date('2025-06-09T06:59:59+09:00')],
    ])(
      '시작시간과 끝시간 사이에 있는 경우 총 금액의 30%를 반환한다.',
      (nowDate) => {
        const selectedCartItems = [
          {
            id: 13117,
            quantity: 7,
            product: {
              id: 28,
              name: '아샷추',
              price: 3800,
              imageUrl:
                'https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2023/12/%EC%95%84%EC%83%B7%EC%B6%94%EC%95%84%EC%9D%B4%EC%8A%A4%ED%8B%B0%EC%83%B7%EC%B6%94%EC%B9%B4%EB%94%94%EC%B9%B4%ED%8E%98%EC%9D%B8_1.png',
              category: '식료품',
            },
          },
          {
            id: 13121,
            quantity: 5,
            product: {
              id: 137,
              name: '[빙그래] 요맘때 파인트 710mL 3종 (택1)',
              price: 5000,
              imageUrl:
                'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/73061aab-a2e2-443a-b0f9-f19b7110045e.jpg',
              category: '공백제이',
            },
          },
        ];
        const sum = selectedCartItems.reduce(
          (a, b) => a + b.product.price * b.quantity,
          0
        );
        const result = calculateCouponPrice({
          selectedCoupons: [coupons[3]],
          selectedCartItems,
          deliveryFee: 3000,
          nowDate,
        });

        expect(result).toBe(sum * 0.3);
      }
    );
  });
});
