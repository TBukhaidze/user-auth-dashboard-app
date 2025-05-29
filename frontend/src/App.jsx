// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
            }
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> :  <Dashboard /> }
          />
          <Route
            path="*"
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
