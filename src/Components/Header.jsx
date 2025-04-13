// src/Components/Header.js
import { Link } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const totalItems = useSelector(state => state.cart.totalItems);
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid justify-content-center">
        <div className="d-flex flex-grow-1 justify-content-between align-items-center" style={{ maxWidth: '1200px', width: '100%' }}>
          <Link to="/" className="navbar-brand mx-3 fw-bold">Products App</Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-2">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
              <li className="nav-item mx-2">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item mx-2">
                <select 
                  value={language} 
                  onChange={handleLanguageChange}
                  className="form-select form-select-sm"
                  style={{ width: '80px' }}
                >
                  <option value="en">EN</option>
                  <option value="ar">AR</option>
                </select>
              </li>
              <li className="nav-item mx-2">
                <Link to="/cart" className="nav-link d-flex align-items-center position-relative">
                  <BsCart3 size={20} />
                  {totalItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;