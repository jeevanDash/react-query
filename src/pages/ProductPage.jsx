import React from "react";
import { useParams } from "react-router-dom";
import { Product } from "../components/Product/Product";
import { useProductQuery } from "../hooks/useProductQuery";

const ProductPage = () => {
  const params = useParams();
  const { isLoading, data, isError, error, isFetching } = useProductQuery(
    ["products", params.id],
    () => {},
    params.id
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
      <div className="d-flex justify-content-center align-items-center">
        <Product
          id={data.data.id || ""}
          title={data.data.title || "No title"}
          image={data.data.images[0] || "no img"}
          price={data.data.price || 0}
          category={data.data.category.name || "no category"}
        />
      </div>
    </div>
  );
};

export default ProductPage;
