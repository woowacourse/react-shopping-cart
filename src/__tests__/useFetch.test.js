import { renderHook, act } from '@testing-library/react';
import { METHOD } from 'constants/index';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { productList } from 'assets/mock';
import useFetch from 'hooks/useFetch';

const server = setupServer(
  rest.get('/test', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productList));
  }),

  rest.get('/testFail', (req, res, ctx) => {
    return res(ctx.status(500));
  }),
);

const mockHandler = jest.fn();
const mockArgs = {
  method: METHOD.GET,
  url: '/test',
  handler: mockHandler,
};

const mockFailArgs = {
  method: METHOD.GET,
  url: '/testFail',
  handler: mockHandler,
};

describe('useFetch 커스텀 훅 테스트', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('useFetch 내 초기 상태가 data = null, isLoading = false, isError=false로 설정되어 있다. ', () => {
    const { result } = renderHook(() => useFetch(mockArgs));
    const { data, isLoading, isError } = result.current;
    expect(data).toEqual(null);
    expect(isLoading).toEqual(false);
    expect(isError).toEqual(false);
  });

  test('fetchApi 함수를 호출 한 후 요청이 시작되면(Pending)가 isLoading = true 로 상태가 변경된다.', async () => {
    const { result } = renderHook(() => useFetch(mockArgs));
    await act(async () => {
      result.current.fetchApi();
    });
    expect(result.current.isLoading).toEqual(true);
    expect(result.current.isError).toEqual(false);
    expect(result.current.data).toEqual(null);
  });

  test('fetchApi 함수를 호출 한 후 요청이 완료되면(fulfilled) 결과값이 data에 저장된다.', async () => {
    const { result } = renderHook(() => useFetch(mockArgs));
    await act(async () => {
      await result.current.fetchApi();
    });
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isError).toEqual(false);
    expect(result.current.data).toEqual(productList);
  });

  test('fetchApi 함수를 호출 한 후 요청이 실패하면(Rejected)가 isLoading = false, isError=true 로 상태가 변경된다.', async () => {
    const { result } = renderHook(() => useFetch(mockFailArgs));
    await act(async () => {
      await result.current.fetchApi();
    });
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isError).toEqual(true);
    expect(result.current.data).toEqual(null);
  });

  test('fetchApi 함수를 호출 한 후 요청이 완료되어 data 상태가 변경되면, handler 함수가 호출된다.', async () => {
    const { result } = renderHook(() => useFetch(mockArgs));
    await act(async () => {
      await result.current.fetchApi();
    });
    expect(mockHandler).toHaveBeenCalled();
  });
});
