import React, { useState } from "react";
import { Product } from "../components/Product/Product";
import { useProductsQuery } from "../hooks/useProductsQuery";

const FetchingPage = () => {
  const [enabled, setEnabled] = useState(true);
  const { isLoading, data, isError, error, isFetching, refetch } =
    useProductsQuery("products", () => ({
      enabled,
    }));

  // console.log(error, isError);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      {isFetching && <h2>Fetching Loading...</h2>}
      <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
        <button
          type="button"
          onClick={() => {
            setEnabled(true);
          }}
          className="btn btn-success"
        >
          Fetch Without Click
        </button>
        <button
          type="button"
          onClick={() => {
            setEnabled(false);
            refetch();
          }}
          className="btn btn-info"
        >
          Fetch On Click
        </button>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {data?.data?.map((product) => (
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

export default FetchingPage;
