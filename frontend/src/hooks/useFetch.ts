import { useState, useEffect } from "react";
import { api } from "../api/client";

const useFetch = <T>(url: string, initialData: T) => {
  const [data, setData]       = useState<T>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(url)
      .then(res => setData(res))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
};

export default useFetch;