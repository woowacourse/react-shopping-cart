import { ROUTE_PATHS } from '@routes/route.constant';

export const isValidPathName = (pathname: string): pathname is (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS] => {
  return (Object.values(ROUTE_PATHS) as string[]).includes(pathname);
};
