const fetchConfig = {
  endpoint: process.env.CONTENTFUL_GRAPHQL_ENDPOINT as string,
  params: {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN}`,
    },
  },
};

export function customFetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit["headers"]
): () => Promise<TData> {
  return async () => {
    const res = await fetch(fetchConfig.endpoint, {
      method: "POST",
      ...options,
      ...fetchConfig.params,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0] || {};
      throw new Error(message || "Unknown error");
    }

    return json.data;
  };
}
