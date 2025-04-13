import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='text-center'>
      <h1>404 - Page Not Found</h1>
      <br />
      <Link to="/" className="home-link">Go back to home</Link>
    </div>
  );
};

export default NotFound;