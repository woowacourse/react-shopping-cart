export function setCookie(key: string, value: string, expireTime: number): void {
  document.cookie = `${key}=${value};max-age=${expireTime}`;
}

export function getCookie(key: string): string | undefined {
  const targetCookie: string | undefined = document.cookie
    .split('; ')
    .find(cookie => cookie.split('=')[0] === key);

  return targetCookie ? targetCookie.split('=')[1] : undefined;
}

export function deleteCookie(key: string): void {
  setCookie(key, '', -1);
}
