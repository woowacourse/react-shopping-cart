import { describe, it, expect } from 'vitest';
import { isValidImageUrl } from '../src/utils/isValidImageUrl';

describe('isValidImageUrl', () => {
  it('올바른 이미지 URL은 true를 반환한다', () => {
    expect(isValidImageUrl('https://example.com/image.png')).toBe(true);
    expect(isValidImageUrl('http://example.com/image.jpg')).toBe(true);
    expect(isValidImageUrl('https://example.com/image.jpeg')).toBe(true);
    expect(isValidImageUrl('https://example.com/image.gif')).toBe(true);
    expect(isValidImageUrl('https://example.com/image.webp')).toBe(true);
    expect(isValidImageUrl('https://example.com/image.bmp')).toBe(true);
    expect(isValidImageUrl('https://example.com/image.svg')).toBe(true);
    expect(isValidImageUrl('https://example.com/image.png?width=100')).toBe(
      true
    );
    expect(isValidImageUrl('https://example.com/image')).toBe(true);
    expect(isValidImageUrl('//example.com/image')).toBe(true);
    expect(isValidImageUrl('//example.com/image.png')).toBe(true);
  });

  it('이미지 확장자가 아닌 경우 false를 반환한다', () => {
    expect(isValidImageUrl('https://example.com/image.txt')).toBe(false);
    expect(isValidImageUrl('https://example.com/image.pdf')).toBe(false);
  });

  it('http/https로 시작하지 않고 //로도 시작하지 않는 경우 false를 반환한다', () => {
    expect(isValidImageUrl('ftp://example.com/image.png')).toBe(false);
    expect(isValidImageUrl('file://example.com/image.png')).toBe(false);
    expect(isValidImageUrl('/images/image.png')).toBe(false);
    expect(isValidImageUrl('example.com/image.png')).toBe(false);
  });
});
