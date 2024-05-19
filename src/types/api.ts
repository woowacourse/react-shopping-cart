export interface FetchResponseType {
  url: string;
  method: 'GET' | 'PATCH' | 'DELETE';
  body?: string | null;
}
