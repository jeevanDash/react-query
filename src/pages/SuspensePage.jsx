import React from "react";
import { useQueryErrorResetBoundary } from "react-query";
import { Product } from "../components/Product/Product";
import { useProductsQuery } from "../hooks/useProductsQuery";

import { ErrorBoundary } from "react-error-boundary";

const SuspensePage = () => {
  const { reset } = useQueryErrorResetBoundary();
  const { isLoading, data, isError, error, isFetching } = useProductsQuery(
    "products",
    () => ({
      suspense: true,
    }),
    {
      offset: 0,
      limit: 25,
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          There was an error!
          <button
            type="button"
            className="btn btn-warning"
            onClick={resetErrorBoundary}
          >
            Try again
          </button>
        </div>
      )}
    >
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
    </ErrorBoundary>
  );
};

export default SuspensePage;
