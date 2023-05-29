import type { HttpRequest, HttpResponse } from './RestAPI';

export type ProductEntity = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type CartItemEntity = {
  id: number;
  quantity: number;
  product: ProductEntity;
};

export type ShoppingCartRestAPI =
  | {
      request: HttpRequest<'GET', '/products'>;
      response: HttpResponse<200, ProductEntity[]>;
    }
  | {
      request: HttpRequest<'GET', '/products/:productId'>;
      response: HttpResponse<200, ProductEntity> | HttpResponse<404>;
    }
  | {
      request: HttpRequest<'POST', '/products', never, Omit<ProductEntity, 'id'>>;
      response: HttpResponse<201, never, { location: string }>;
    }
  | {
      request: HttpRequest<
        'PUT',
        '/products/:productId',
        never,
        Partial<Omit<ProductEntity, 'id'>>
      >;
      response: HttpResponse<200>;
    }
  | {
      request: HttpRequest<'DELETE', '/products/:productId'>;
      response: HttpResponse<204>;
    }
  | {
      request: HttpRequest<'GET', '/cart-items'>;
      response: HttpResponse<200, CartItemEntity[]>;
    }
  | {
      request: HttpRequest<'POST', '/cart-items', never, { productId: number }>;
      response: HttpResponse<201> | HttpResponse<404> | HttpResponse<409>;
    }
  | {
      request: HttpRequest<'PATCH', '/cart-items/:cartItemId', never, { quantity: number }>;
      response: HttpResponse<200> | HttpResponse<400>;
    }
  | {
      request: HttpRequest<'DELETE', '/cart-items/:cartItemId'>;
      response: HttpResponse<204> | HttpResponse<400>;
    };
