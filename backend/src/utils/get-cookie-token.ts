export function getCookieToken(cookieString: string, cookieName: string) {
  const cookies = cookieString?.split('; ');

  for (let i = 0; i < cookies?.length; i++) {
    const cookie = cookies[i];
    const [name, value] = cookie?.split('=');
    if (name === cookieName) {
      return value;
    }
  }
  return null;
}
