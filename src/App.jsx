import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import { useAuthStore } from './store/authStore';
import AiAssistant from './components/common/AiAssistant';
import SocialProof from './components/common/SocialProof';
import CartDrawer from './components/cart/CartDrawer';
import { Spinner } from './components/common/Loader'; 

// Lazy loaded pages to reduce initial bundle size
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Restaurants = lazy(() => import('./pages/Restaurants'));
const RestaurantDetail = lazy(() => import('./pages/RestaurantDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Orders = lazy(() => import('./pages/Orders'));
const OrderDetail = lazy(() => import('./pages/OrderDetail'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminRestaurants = lazy(() => import('./pages/AdminRestaurants'));
const AdminOrders = lazy(() => import('./pages/AdminOrders'));
const DeliveryDashboard = lazy(() => import('./pages/DeliveryDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const DeliveryPartnerCTA = lazy(() => import('./pages/DeliveryPartnerCTA'));
const TomatoGold = lazy(() => import('./pages/TomatoGold'));
const Profile = lazy(() => import('./pages/Profile'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const ProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  
  if (roles.length > 0 && !roles.includes(user?.role)) {
    // If not authorized, redirect to their role's default dashboard
    if (user?.role === 'ADMIN') return <Navigate to="/admin" replace />;
    if (user?.role === 'DELIVERY_PARTNER') return <Navigate to="/delivery/dashboard" replace />;
    return <Navigate to="/" replace />;
  }
  return children;
};

// Global Page Fallback Loader
const PageLoader = () => (
  <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
    <Spinner size={48} />
    <p className="text-gray-500 font-bold animate-pulse">Loading awesome food...</p>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/restaurants/:id" element={<RestaurantDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/delivery" element={<DeliveryPartnerCTA />} />
              <Route path="/gold" element={<TomatoGold />} />
              
              {/* Protected Routes */}
              <Route path="/checkout" element={
                <ProtectedRoute roles={['CUSTOMER']}>
                  <Checkout />
                </ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute roles={['CUSTOMER']}>
                  <Orders />
                </ProtectedRoute>
              } />
              <Route path="/orders/:id" element={
                <ProtectedRoute roles={['CUSTOMER']}>
                  <OrderDetail />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute roles={['CUSTOMER']}>
                  <Profile />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute roles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/restaurants" element={
                <ProtectedRoute roles={['ADMIN']}>
                  <AdminRestaurants />
                </ProtectedRoute>
              } />
              <Route path="/admin/orders" element={
                <ProtectedRoute roles={['ADMIN']}>
                  <AdminOrders />
                </ProtectedRoute>
              } />

              {/* Delivery Routes */}
              <Route path="/delivery/dashboard" element={
                <ProtectedRoute roles={['DELIVERY_PARTNER']}>
                  <DeliveryDashboard />
                </ProtectedRoute>
              } />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
        <AiAssistant />
        <SocialProof />
        <CartDrawer />
        <Toaster position="bottom-right" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
