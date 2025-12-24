import { useEffect, useState } from "react";

function useApi(apiFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFunction()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [apiFunction]);

  return { data, loading };
}

export default useApi;
