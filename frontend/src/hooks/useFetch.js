import { useCallback, useEffect, useRef, useState } from 'react';
import { extractError } from '@utils/helpers';

const useFetch = (fetchFn, options = {}) => {
  const { immediate = true, deps = [], onSuccess, onError } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const execute = useCallback(
    async (...args) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setLoading(true);
      setError(null);

      try {
        const response = await fetchFn(...args);
        const result = response.data;
        setData(result);
        onSuccess?.(result);
        return result;
      } catch (err) {
        if (err.name === 'AbortError') return;
        const message = extractError(err);
        setError(message);
        onError?.(message);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchFn, ...deps]
  );

  useEffect(() => {
    if (immediate) execute();
    return () => abortControllerRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset, setData };
};

export default useFetch;