import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

export const Product = ({ id, image, title, price, category }) => {
  return (
    <div className="card h-100 mb-3" style={{ maxWidth: 540 }}>
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">
          <Link to={ROUTES.PRODUCT.replace(":id", id)}>{title}</Link>
        </h5>
        <div className="d-flex justify-content-between mt-4 align-items-start">
          <span className="card-text badge text-bg-success">{category}</span>
          <span className="card-text">
            <small className="text-muted">${price}</small>
          </span>
        </div>
      </div>
    </div>
  );
};
