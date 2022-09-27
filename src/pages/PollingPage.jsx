import React from "react";
import { Product } from "../components/Product/Product";
import { useProductsQuery } from "../hooks/useProductsQuery";

const PollingPage = () => {
  const { isLoading, data, isError, error, isFetching } = useProductsQuery(
    "products",
    () => ({
      // refetchInterval: 3000,
      refetchIntervalInBackground: true,
    })
  );

  if (isLoading) {
    return <h2>Initial Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      {isFetching && <h2>Fetching Loading...</h2>}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {data?.data.map((product) => (
          <div key={product.id} className="col">
            <Product
              id={product.id}
              title={product.title}
              image={product.images[0]}
              price={product.price}
              category={product.category.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollingPage;
