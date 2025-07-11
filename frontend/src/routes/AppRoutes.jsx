import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import NotFound from "../pages/notFound/NotFound";
import Login from "../pages/login/Login";
import ProtectedRoute from "../components/adminProtectedRoute/ProtectedRoute";
import History from "../pages/transactionHistory/History";
import Category from "../pages/category/Category";
import Promotion from "../pages/promotion/Promotion";
import Offer from "../pages/offer/Offer";
import Users from "../pages/users/Users";
import KYC from "../pages/kycRequests/Kyc";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transaction-history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />
      <Route
        path="/category"
        element={
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        }
      />
      <Route
        path="/promotion"
        element={
          <ProtectedRoute>
            <Promotion />
          </ProtectedRoute>
        }
      />
      <Route
        path="/offers"
        element={
          <ProtectedRoute>
            <Offer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/kyc-requests"
        element={
          <ProtectedRoute>
            <KYC />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
