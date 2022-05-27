export const { clearCache, caching } = (() => {
  const cache = {};

  const timeout = {};

  // 맨 마지막 요청을 기준으로 10초가 지나면 재검증을 위해 캐시 데이터를 파기
  function setCacheData(key, data) {
    cache[key] = data;

    if (timeout[key]) {
      clearTimeout(timeout[key]);
    }

    timeout[key] = setTimeout(() => {
      cache[key] = null;
    }, 10000);
  }

  function getCacheData(key) {
    return cache[key];
  }

  return {
    // 자원의 수정을 요청하는 fetcher에서 이 메소드를 호출한다.
    // 캐시 데이터를 클리어하여 새로운 요청을 하도록 한다.
    clearCache(key) {
      clearTimeout(timeout[key]);
      timeout[key] = null;
      cache[key] = null;
    },

    caching: async (api, key) => {
      const cacheData = getCacheData(key);
      if (cacheData) {
        return cacheData;
      }
      const data = await api();

      setCacheData(key, data);

      return data;
    },
  };
})();
