import '@testing-library/jest-dom';

// TextEncoder와 TextDecoder를 모킹 (Buffer 사용하지 않는 더 간단한 방법)
class TextEncoderMock {
  encode(text: string): Uint8Array {
    const arr = new Uint8Array(text.length);
    for (let i = 0; i < text.length; i++) {
      arr[i] = text.charCodeAt(i);
    }
    return arr;
  }
}

class TextDecoderMock {
  decode(bytes: Uint8Array): string {
    return String.fromCharCode.apply(null, Array.from(bytes));
  }
}

// @ts-expect-error - TextEncoder is not available in the global scope in the test environment
global.TextEncoder = TextEncoderMock;
// @ts-expect-error - TextDecoder is not available in the global scope in the test environment
global.TextDecoder = TextDecoderMock;
