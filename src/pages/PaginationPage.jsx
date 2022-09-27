import React from "react";
import { useState } from "react";
import { Product } from "../components/Product/Product";
import { useProductsQuery } from "../hooks/useProductsQuery";

const PaginationPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, data, isError, error, isFetching } = useProductsQuery(
    ["products", pageNumber],
    () => ({
      keepPreviousData: true,
    }),
    {
      _page: pageNumber,
      _limit: 6,
    }
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
      <nav
        className="d-flex justify-content-center align-items-center my-4"
        aria-label="pagination"
      >
        <ul className="pagination">
          <li
            className={`page-item ${pageNumber === 1 ? "disabled" : ""}`}
            onClick={() =>
              pageNumber === 1 ? {} : setPageNumber((page) => page - 1)
            }
            role="button"
          >
            <span className="page-link">Previous</span>
          </li>
          <li
            className={`page-item ${
              pageNumber === Math.floor(19 / 6) ? "disabled" : ""
            }`}
            role="button"
            onClick={() =>
              pageNumber === Math.floor(19 / 6)
                ? {}
                : setPageNumber((page) => page + 1)
            }
          >
            <span className="page-link">Next</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationPage;
