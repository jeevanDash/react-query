import React, { useState } from "react";
import { Product } from "../components/Product/Product";
import { useAddProduct, useProductsQuery } from "../hooks/useProductsQuery";

const Mutation = () => {
  const { isLoading, data, isError, error } = useProductsQuery();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [formError, setFormError] = useState({});

  const {
    mutate: addProduct,
    isError: isMutateError,
    error: mutateError,
  } = useAddProduct();
  const handleAddProduct = () => {
    setFormError({});
    if (!title || !price || !category || !image) {
      setFormError((prev) => ({
        ...prev,
        title: !title ? "Title is required" : "",
        price: !price ? "Price is required" : "",
        image: !image ? "Image is required" : "",
        category: !category ? "Category is required" : "",
      }));
      return;
    }
    const payload = {
      title,
      price,
      description: "Temp description",
      category: {
        id: price,
        name: category,
        image: "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
      },
      images: [image],
    };

    addProduct(payload);
  };

  if (isLoading) {
    return <h2>Initial Loading...</h2>;
  }

  if (isError || isMutateError) {
    return <h2>{error.message || mutateError.message}</h2>;
  }
  return (
    <div>
      <div className="row g-3 mb-4">
        <div className="col-12">
          <h2>Create a Product</h2>
        </div>
        <div className="col-6">
          <label for="title" className="visually-hidden">
            Title
          </label>
          <div>
            <input
              type="text"
              className={`form-control ${formError?.title ? "is-invalid" : ""}`}
              id="title"
              placeholder="add product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            {formError.title && (
              <div className="invalid-feedback">{formError.title}</div>
            )}
          </div>
        </div>
        <div className="col-6">
          <label for="price" className="visually-hidden">
            Price
          </label>
          <input
            type="number"
            className={`form-control ${formError?.price ? "is-invalid" : ""}`}
            id="price"
            placeholder="add product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {formError.price && (
            <div className="invalid-feedback">{formError.price}</div>
          )}
        </div>
        <div className="col-6">
          <label for="category" className="visually-hidden">
            Category
          </label>
          <input
            type="text"
            className={`form-control ${
              formError?.category ? "is-invalid" : ""
            }`}
            id="category"
            placeholder="add product category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {formError.category && (
            <div className="invalid-feedback">{formError.category}</div>
          )}
        </div>
        <div className="col-6">
          <label for="image" className="visually-hidden">
            Product Image
          </label>
          <input
            type="text"
            className={`form-control ${formError?.image ? "is-invalid" : ""}`}
            id="image"
            placeholder="add product image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          {formError.image && (
            <div className="invalid-feedback">{formError.image}</div>
          )}
        </div>
        <div className="d-grid">
          <button className="btn btn-success" onClick={handleAddProduct}>
            Add Product
          </button>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {data?.data
          ?.sort((a, b) => b.id - a.id)
          .map((product) => (
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

export default Mutation;
