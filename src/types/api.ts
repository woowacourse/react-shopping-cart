export interface FetchResponseType {
  url: string;
  method: 'GET' | 'PATCH' | 'DELETE' | 'POST';
  body?: string | null;
}
