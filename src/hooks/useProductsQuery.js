import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { request } from "../utils/axios-utils";

const fetchProducts = ({ ...queryParams }) => {
  return request({
    url: "/products",
    params: {
      ...queryParams,
    },
  });
};

export const useProductsQuery = (
  key = "products",
  configCallback,
  queryParams
) => {
  return useQuery(
    key,
    () => fetchProducts(queryParams || {}),
    configCallback && configCallback()
  );
};

const addProduct = (product) => {
  return request({ url: "/products", method: "post", data: product });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(addProduct, {
    onSuccess: (data) => {
      queryClient.setQueriesData("products", (oldData) => {
        return {
          ...oldData,
          data: [...oldData.data, data.data],
        };
      });
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData("products", context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("products");
    },
  });
};

export const useInfiniteProductQuery = (queryParams) => {
  return useInfiniteQuery(
    ["products-infinite"],
    (...args) =>
      fetchProducts({ ...queryParams, pageParam: args[0].pageParam || 1 }),
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < Math.floor(19 / 6)) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    }
  );
};
