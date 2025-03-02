import { Routes, Route, Navigate } from "react-router-dom"; // No need for BrowserRouter here
import Login from "./Login";
import Signup from "./Signup";
import AgentPage from "./AgentPage";
import Profile from "./Profile";
import HomePage from "./Homepage";
import SellerRegistration from "./SellerRegistration";
import PropertyDetails from "./PropertyDetails"; // Import Property Details component
import PrivateRoute from "./PrivateRoute"; // Import Private Route
import EditProperty from "./EditProperty";
import ForgotPassword from "./ForgotPassword";
import BuyPayment from "./BuyPayment";
import AdminDashboard from "./AdminDashboard;";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/supradmin" element={<AdminDashboard />} />

      {/* Protected Routes */}
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/buyer" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/seller" element={<PrivateRoute><SellerRegistration /></PrivateRoute>} />
      <Route path="/getprop" element={<BuyPayment />}/>
      <Route path="/agent" element={<PrivateRoute><AgentPage /></PrivateRoute>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/homepage" element={<PrivateRoute><HomePage /></PrivateRoute>} />

      {/* Newly Added Property Details Route */}
      <Route path="/property/:id" element={<PrivateRoute><PropertyDetails /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/edit-property/:id" element={<PrivateRoute><EditProperty /></PrivateRoute>} />
      {/* Redirect unknown routes to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
