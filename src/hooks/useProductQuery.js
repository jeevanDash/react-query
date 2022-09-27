import { useQuery } from "react-query";
import { request } from "../utils/axios-utils";

const fetchProduct = (id) => {
  return request({
    url: `/products/${id}`,
  });
};

export const useProductQuery = (key = "products", configCallback, id) => {
  return useQuery(
    key,
    () => fetchProduct(id),
    configCallback && configCallback()
  );
};
