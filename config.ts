// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const env: any = import.meta.env;

const baseURL: string = env.MODE === 'production' ? 'https://step2--shopping-cart-booung.netlify.app' : 'http://localhost:3000';

export default baseURL;
