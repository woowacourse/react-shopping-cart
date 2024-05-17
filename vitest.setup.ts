import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
});

global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;
global.localStorage = dom.window.localStorage;
