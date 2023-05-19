import Client from './Client';
import type { ShoppingCartRestAPI } from './rest/ShoppingCartRestAPI';

export const client = new Client<ShoppingCartRestAPI>();

export const path = client.path.bind(client);
