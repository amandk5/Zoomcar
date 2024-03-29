import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../Components/PrivateRoute";
import AdminDashboard from "../pages/AdminDashboard";
import AdminListCarsPage from "../pages/AdminListCarsPage";
import AdminListUsersPage from "../pages/AdminListUsersPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import BookingsPage from "./BookingsPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ResultsPage from "./ResultsPage";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<ResultsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/bookings"
        element={
          <PrivateRoute>
            <BookingsPage />
          </PrivateRoute>
        }
      />
      {/* for admin  */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/list/users"
        element={
          <PrivateRoute>
            <AdminListUsersPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
