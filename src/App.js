import "./App.less";
import PrivateRoute from "./Routes/PrivateRoute";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Container/Authentication/Login/Login";
import SignUp from "./Container/Authentication/SignUp/SignUp";
import NotFound from "./Container/404/404";
import Dashboard from "./Container/Dashboard/dashboard";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/Fraud/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
};

export default App;
