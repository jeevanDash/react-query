import React from "react";
import { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../app.context";
import { Product } from "../components/Product/Product";
import { useProductsQuery } from "../hooks/useProductsQuery";
import { ROUTES } from "../utils/routes";

const CUSTOM_CACHE = 5 * 1000; // 5seconds | Default: 30min
const CUSTOM_STALE = 5 * 1000; // 5seconds | Default : 0sec
const CachingPage = () => {
  const { setFetchType } = useContext(AppContext);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const getConfig = (type) => {
    let config = {};
    if (type === "Cache") {
      config["cacheTime"] = CUSTOM_CACHE;
    } else if (type === "Stale") {
      config["staleTime"] = CUSTOM_STALE;
    } else if (type === "Refetch") {
      // config["refetchOnMount"] = false; // 'always'
      config["refetchOnWindowFocus"] = false; // 'always'
    } else {
      delete config?.cacheTime;
      delete config?.staleTime;
      delete config?.refetchOnMount;
      delete config?.refetchOnWindowFocus;
    }
    console.log(config);
    return config;
  };

  const { isLoading, data, isError, error, isFetching } = useProductsQuery(
    ["products", searchParams.get("fetchType")],
    () => getConfig(searchParams.get("fetchType"))
  );
  // console.log({ isLoading, isFetching });

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
            setFetchType((prev) => ({
              Cache: true,
              Stale: false,
              Refetch: false,
            }));
            navigate(`/${ROUTES.CACHING}?fetchType=Cache`);
          }}
          className="btn btn-success"
        >
          Cache {CUSTOM_CACHE}ms
        </button>
        <button
          type="button"
          onClick={() => {
            setFetchType((prev) => ({
              Cache: false,
              Stale: true,
              Refetch: false,
            }));
            navigate(`/${ROUTES.CACHING}?fetchType=Stale`);
          }}
          className="btn btn-info"
        >
          Stale {CUSTOM_STALE}ms
        </button>
        <button
          type="button"
          onClick={() => {
            setFetchType((prev) => ({
              Cache: false,
              Stale: false,
              Refetch: true,
            }));
            navigate(`/${ROUTES.CACHING}?fetchType=Refetch`);
          }}
          className="btn btn-warning"
        >
          Refetch Default
        </button>
      </div>
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

export default CachingPage;
