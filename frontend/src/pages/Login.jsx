import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import { CiMail } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      if (rememberMe) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-fluid min-vh-100 p-0">
      <div className="row g-0 h-100">
        <div className="col-md-6 d-flex flex-column bg-white">
          <div className="p-5">
            <h1 className="text-primary fw-bold mb-0">THE APP</h1>
          </div>

          <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 py-5">
            <div className="w-100 px-4" style={{ maxWidth: "400px" }}>
              <div className="text-left mb-4">
                <p className="text-muted mb-0">Start your journey</p>
                <h2 className="mb-4">Sign in to The App</h2>
              </div>

              <form onSubmit={handleLogin} className="mb-4">
                <label className="form-label text-muted small mx-2">
                  E-mail
                </label>
                <div className="mb-4 form-control form-control-lg border border-light-subtle rounded-2">
                  <div className="d-flex">
                    <input
                      type="email"
                      className="form-control-plaintext"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value.toLocaleLowerCase())
                      }
                      required
                      placeholder="test@example.com"
                    />
                    <div className="d-flex justify-content-center align-items-center">
                      <CiMail className="fs-5 text-secondary" />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label text-muted small mx-2">
                    Password
                  </label>
                  <div className="mb-4 form-control form-control-lg border border-light-subtle rounded-2">
                    <div className="d-flex">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control-plaintext"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="**********"
                      />
                      <button
                        type="button"
                        className="input-group-text bg-white border-0 rounded-end-2 px-0"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <FaRegEyeSlash className="fs-5 text-secondary" />
                        ) : (
                          <FaRegEye className="fs-5 text-secondary" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input border border-light-subtle"
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                </div>

                <div className="d-grid mb-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg fw-bold py-3 rounded-2"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex justify-content-between p-5">
            <p className="mb-0">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-decoration-underline fw-bold"
              >
                Sign up
              </Link>
            </p>
            <p className="mb-0">
              <Link
                to="/forgot-password"
                className="text-decoration-underline"
                onClick={() => {
                  toast.error(
                    "If you fogrot password please contact to admin `adgmin@gmail.com`"
                  );
                }}
              >
                Forgot password?
              </Link>
            </p>
          </div>
        </div>

        <div
          className="col-md-6 d-none d-md-flex"
          style={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            minHeight: "100vh",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
