import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const data = await response.json();
        
        if (!data || !data.id) {
          throw new Error('Product not found');
        }
        
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        navigate('/not-found'); 
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      brand: product.brand,
    }));
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
  if (error) return navigate('/not-found'); 
  if (!product) return navigate('/not-found'); 

  return (
    <div className="container py-4">
      <Link to="/" className="btn btn-outline-primary mb-4">
        ← Back to Products
      </Link>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="card-img-top p-3"
              style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
            
            <div className="card-body">
              <div className="row g-2">
                {product.images.map((image, index) => (
                  <div key={index} className="col-4">
                    <img 
                      src={image} 
                      alt={`${product.title} ${index + 1}`} 
                      className="img-thumbnail"
                      style={{ height: '100px', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{product.title}</h2>
              <p className="text-muted">{product.brand} | {product.category}</p>
              
              <div className="d-flex align-items-center mb-3">
                <span className="badge bg-warning text-dark me-2">
                  ⭐ {product.rating}
                </span>
                <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                </span>
              </div>
              
              <h3 className="text-primary mb-3">${product.price}</h3>
              
              <p className="card-text">{product.description}</p>
              
              <div className="d-flex justify-content-center mt-3">
                <button 
                  className="btn btn-success btn-lg" 
                  style={{ width: '50%' }}
                  disabled={product.stock === 0}
                  onClick={handleAddToCart}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;