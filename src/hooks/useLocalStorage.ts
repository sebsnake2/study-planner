import { useCallback } from "react";

export function useLocalStorage<T>(key: string, fallbackValue: T) {
  const read = useCallback((): T => {
    try {
      const saved = localStorage.getItem(key);

      if (!saved) {
        return fallbackValue;
      }

      return JSON.parse(saved) as T;
    } catch {
      return fallbackValue;
    }
  }, [key, fallbackValue]);

  const write = useCallback(
    (value: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // localStorage may be unavailable.
      }
    },
    [key],
  );

  return {
    read,
    write,
  };
}
