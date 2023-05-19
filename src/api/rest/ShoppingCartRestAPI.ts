import type { Cart, Product } from '../../type';
import type { HttpRequest, HttpResponse } from './RestAPI';

export type ShoppingCartRestAPI =
  | {
      request: HttpRequest<'GET', '/products'>;
      response: HttpResponse<200, Product[]>;
    }
  | {
      request: HttpRequest<'GET', '/products/:productId'>;
      response: HttpResponse<200, Product>;
    }
  | {
      request: HttpRequest<'POST', '/products', never, Omit<Product, 'id'>>;
      response: HttpResponse<201, never, { location: string }>;
    }
  | {
      request: HttpRequest<'PUT', '/products/:productId', never, Partial<Omit<Product, 'id'>>>;
      response: HttpResponse<200>;
    }
  | {
      request: HttpRequest<'DELETE', '/products/:productId'>;
      response: HttpResponse<204>;
    }
  | {
      request: HttpRequest<'GET', '/cart-items'>;
      response: HttpResponse<200, Cart>;
    }
  | {
      request: HttpRequest<'POST', '/cart-items', never, { productId: number }>;
      response: HttpResponse<201>;
    }
  | {
      request: HttpRequest<'PATCH', '/cart-items/:cartItemId', never, { quantity: number }>;
      response: HttpResponse<200>;
    }
  | {
      request: HttpRequest<'DELETE', '/cart-items/:cartItemId'>;
      response: HttpResponse<204>;
    };
