import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ThreeDots } from 'react-loader-spinner'; // Import specific loader
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';

import { CartContext } from '../../context/CartContext'; // Named import
import Header from '../Header';
import SimilarProductItem from '../SimilarProductItem';

import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const ProductItemDetails = () => {
  const [productData, setProductData] = useState({});
  const [similarProductsData, setSimilarProductsData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const { addCartItem } = useContext(CartContext); // Use context

  useEffect(() => {
    const getProductData = async () => {
      setApiStatus(apiStatusConstants.inProgress);

      const jwtToken = Cookies.get('jwt_token');
      const apiUrl = `https://apis.ccbp.in/products/${id}`;
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      };

      try {
        const response = await fetch(apiUrl, options);
        if (response.ok) {
          const fetchedData = await response.json();
          const updatedData = {
            availability: fetchedData.availability,
            brand: fetchedData.brand,
            description: fetchedData.description,
            id: fetchedData.id,
            imageUrl: fetchedData.image_url,
            price: fetchedData.price,
            rating: fetchedData.rating,
            title: fetchedData.title,
            totalReviews: fetchedData.total_reviews,
          };
          const updatedSimilarProductsData = fetchedData.similar_products.map(
            (eachSimilarProduct) => ({
              availability: eachSimilarProduct.availability,
              brand: eachSimilarProduct.brand,
              description: eachSimilarProduct.description,
              id: eachSimilarProduct.id,
              imageUrl: eachSimilarProduct.image_url,
              price: eachSimilarProduct.price,
              rating: eachSimilarProduct.rating,
              title: eachSimilarProduct.title,
              totalReviews: eachSimilarProduct.total_reviews,
            })
          );
          setProductData(updatedData);
          setSimilarProductsData(updatedSimilarProductsData);
          setApiStatus(apiStatusConstants.success);
        } else {
          setApiStatus(apiStatusConstants.failure);
        }
      } catch (error) {
        setApiStatus(apiStatusConstants.failure);
      }
    };

    getProductData();
  }, [id]);

  const onDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const onIncrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const onClickAddToCart = () => {
    addCartItem({ ...productData, quantity });
  };

  const renderLoadingView = () => (
    <div className="products-details-loader-container">
      <ThreeDots color="#0b69ff" height={50} width={50} /> {/* Use the specific loader */}
    </div>
  );

  const renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <button type="button" className="button">
        Continue Shopping
      </button>
    </div>
  );

  const renderProductDetailsView = () => (
    <div className="product-details-success-view">
      <div className="product-details-container">
        <img src={productData.imageUrl} alt="product" className="product-image" />
        <div className="product">
          <h1 className="product-name">{productData.title}</h1>
          <p className="price-details">Rs {productData.price}/-</p>
          <div className="rating-and-reviews-count">
            <div className="rating-container">
              <p className="rating">{productData.rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star"
              />
            </div>
            <p className="reviews-count">{productData.totalReviews} Reviews</p>
          </div>
          <p className="product-description">{productData.description}</p>
          <div className="label-value-container">
            <p className="label">Available:</p>
            <p className="value">{productData.availability}</p>
          </div>
          <div className="label-value-container">
            <p className="label">Brand:</p>
            <p className="value">{productData.brand}</p>
          </div>
          <hr className="horizontal-line" />
          <div className="quantity-container">
            <button
              type="button"
              className="quantity-controller-button"
              onClick={onDecrementQuantity}
            >
              <BsDashSquare className="quantity-controller-icon" />
            </button>
            <p className="quantity">{quantity}</p>
            <button
              type="button"
              className="quantity-controller-button"
              onClick={onIncrementQuantity}
            >
              <BsPlusSquare className="quantity-controller-icon" />
            </button>
          </div>
          <button
            type="button"
            className="button add-to-cart-btn"
            onClick={onClickAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <h1 className="similar-products-heading">Similar Products</h1>
      <ul className="similar-products-list">
        {similarProductsData.map((eachSimilarProduct) => (
          <SimilarProductItem
            productDetails={eachSimilarProduct}
            key={eachSimilarProduct.id}
          />
        ))}
      </ul>
    </div>
  );

  const renderProductDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductDetailsView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="product-item-details-container">
        {renderProductDetails()}
      </div>
    </>
  );
};

export default ProductItemDetails;
