import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product, addToCart }) => {
  const variants = {
    "men's clothing": ["Small", "Medium", "Large", "XL"],
    "women's clothing": ["XS", "Small", "Medium", "Large"],
    "jewelery": ["Silver", "Gold", "Rose Gold"],
    "electronics": ["Black", "White", "Gray"]
  };


  const isAvailable = product.id % 2 === 0;


  const [selectedVariant, setSelectedVariant] = useState(
    variants[product.category] ? variants[product.category][0] : null
  );


  const handleVariantChange = (e) => {
    setSelectedVariant(e.target.value);
  };


  const handleAddToCart = () => {
    if (isAvailable) {
      toast.success("Added to cart");
      addToCart(product);
    } else {
      toast.error("Product is out of stock");
    }
  };

  return (
    <div className="card h-100 product-card">
      <div className="position-relative">
        <img
          className="card-img-top p-3"
          src={product.image}
          alt={product.title}
          style={{ height: "200px", objectFit: "contain" }}
        />
        {!isAvailable && (
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
            <span className="badge bg-danger fs-5 p-2">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate" title={product.title}>
          {product.title}
        </h5>
        
        <div className="my-2">
          <span className="fs-4 fw-bold">${product.price.toFixed(2)}</span>
        </div>
        
        {variants[product.category] && (
          <div className="mb-3">
            <label htmlFor={`variant-${product.id}`} className="form-label mb-1">
              Variant:
            </label>
            <select
              id={`variant-${product.id}`}
              className="form-select"
              value={selectedVariant}
              onChange={handleVariantChange}
              disabled={!isAvailable}
            >
              {variants[product.category].map((variant) => (
                <option key={variant} value={variant}>
                  {variant}
                </option>
              ))}
            </select>
          </div>
        )}
        
        <div className="mt-auto d-grid gap-2">
          {isAvailable ? (
            <>
              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <Link
                to={`/product/${product.id}`}
                className="btn btn-outline-secondary"
              >
                View Details
              </Link>
            </>
          ) : (
            <button
              className="btn btn-secondary"
              disabled
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;