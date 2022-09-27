import React from "react";
import { Product } from "../components/Product/Product";
import { useInfiniteProductQuery } from "../hooks/useProductsQuery";

const InfiniteScrollPage = () => {
  const {
    isLoading,
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteProductQuery({
    _limit: 6,
  });

  if (isLoading) {
    return <h2>Initial Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.map((product) => (
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
          </React.Fragment>
        ))}
      </div>
      <div className="d-flex justify-content-center align-items-center my-4">
        <button
          className={`btn btn-primary `}
          disabled={!hasNextPage}
          onClick={fetchNextPage}
        >
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
};

export default InfiniteScrollPage;
