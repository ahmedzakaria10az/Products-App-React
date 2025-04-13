import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      brand: product.brand,
    }));
  };

  return (
    <div className={`card h-100 ${product.stock === 0 ? 'opacity-75' : ''}`}>
      <div className="position-absolute top-0 start-0 m-2">
        <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
      
      <Link to={`/products/${product.id}`} className="text-decoration-none text-dark">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="card-img-top"
          style={{ height: '200px', objectFit: 'cover' }}
        />
        
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="card-text text-primary fw-bold mb-0">${product.price}</p>
            <span className="text-warning">
              ⭐ {product.rating}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="card-footer bg-transparent p-2">
        <button 
          className="btn btn-success w-50"
          disabled={product.stock === 0}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;