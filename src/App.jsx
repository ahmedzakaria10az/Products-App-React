// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { lazy, Suspense } from 'react';
import Header from './Components/Header';
import LoadingSpinner from './Components/LoadingSpinner'; // Create this component
import { LanguageProvider } from './contexts/LanguageContext';

const ProductsList = lazy(() => import('./Pages/ProductsList'));
const ProductDetails = lazy(() => import('./Pages/ProductDetails'));
const Cart = lazy(() => import('./Pages/Cart'));
const NotFound = lazy(() => import('./Pages/NotFound'));
const Register = lazy(() => import('./Pages/Register'));

function App() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <Router>
          <div className="app">
            <Header />
            <main className="py-4">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<ProductsList />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </Router>
      </LanguageProvider>
    </Provider>
  );
}

export default App;