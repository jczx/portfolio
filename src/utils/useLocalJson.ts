import { useEffect, useState } from "react";

type LoadResult<T> = { status: "loading" | "error"; data: null } | { status: "ready"; data: T };

export const useLocalJson = <T,>(path: string, validate: (value: unknown) => value is T) => {
  const [result, setResult] = useState<LoadResult<T>>({ status: "loading", data: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}${path}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Data file unavailable");
        const data: unknown = await response.json();
        if (!validate(data)) throw new Error("Invalid data file");
        if (!controller.signal.aborted) setResult({ status: "ready", data });
      } catch {
        if (!controller.signal.aborted) setResult({ status: "error", data: null });
      }
    };
    void load();
    return () => controller.abort();
  }, [path, validate, attempt]);

  const retry = () => {
    setResult({ status: "loading", data: null });
    setAttempt(value => value + 1);
  };
  return { ...result, retry };
};
