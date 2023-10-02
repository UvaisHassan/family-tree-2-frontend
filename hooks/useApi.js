import { useState, useEffect } from "react";

const useApi = (base_url) => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL(base_url);
        url.search = new URLSearchParams({ query: query }).toString();
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (query !== "") {
      fetchData();
    }
  }, [query]);

  return { data, setData, query, setQuery };
};

export default useApi;
