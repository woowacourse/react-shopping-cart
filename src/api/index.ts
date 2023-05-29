import Client from './Client';
import type { ShoppingCartRestAPI } from './rest/ShoppingCartRestAPI';

export const client = new Client<ShoppingCartRestAPI>({
  baseUrl: import.meta.env.BASE_URL,
});

export const path = client.path.bind(client);
