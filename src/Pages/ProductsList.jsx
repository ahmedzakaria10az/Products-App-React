import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import Pagination from '../Components/Pagination';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const skip = (currentPage - 1) * productsPerPage;
        const response = await fetch(
          `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`
        );
        const data = await response.json();
        setProducts(data.products);
        setTotalProducts(data.total);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div className="container py-4">
      <p className="text mb-4 font-weight-bold">Welcome to our shopping website, start browsing...</p>
      
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-lg-3 col-md-6 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={totalProducts}
        itemsPerPage={productsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductsList;