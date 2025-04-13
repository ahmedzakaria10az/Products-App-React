import { useSelector, useDispatch } from 'react-redux';
import { 
  incrementQuantity, 
  decrementQuantity, 
  removeFromCart 
} from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, totalItems } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  if (totalItems === 0) {
    return (
      <div className="container py-5">
        <h1 className="mb-4">Your Cart</h1>
        <div className="card">
          <div className="card-body text-center py-5">
            <h3>Your cart is empty</h3>
            <Link to="/" className="btn btn-primary mt-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h1>
      
      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              {items.map(item => (
                <div key={item.id} className="row mb-4 border-bottom pb-3">
                  <div className="col-md-3">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="img-fluid rounded"
                      style={{ maxHeight: '120px' }}
                    />
                  </div>
                  <div className="col-md-5">
                    <h5>{item.title}</h5>
                    <p className="text-muted">{item.brand}</p>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center">
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => dispatch(incrementQuantity(item.id))}
                      >
                        +
                      </button>
                      <span className="ms-auto fw-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal ({totalItems} items)</span>
                <span>
                  ${items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                </span>
              </div>
              <button className="btn btn-primary w-100 mt-3">
                Proceed to Checkout
              </button>
              <Link to="/" className="btn btn-outline-secondary w-100 mt-2">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;