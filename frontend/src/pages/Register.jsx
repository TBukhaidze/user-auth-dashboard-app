import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import { CiUser, CiMail } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
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
                <h2 className="mb-4">Create your account</h2>
              </div>

              <form onSubmit={handleRegister} className="mb-4">
                <label className="form-label text-muted small mx-2">Name</label>
                <div className="mb-4 form-control form-control-lg border border-light-subtle rounded-2">
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control-plaintext"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your Name"
                    />
                    <div className="d-flex justify-content-center align-items-center">
                      <CiUser className="fs-5 text-secondary" />
                    </div>
                  </div>
                </div>

                <label className="form-label text-muted small mx-2">
                  Email
                </label>
                <div className="mb-4 form-control form-control-lg border border-light-subtle rounded-2">
                  <div className="d-flex">
                    <input
                      type="email"
                      className="form-control-plaintext"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.toLowerCase())}
                      required
                      placeholder="Your E-mail"
                    />
                    <div className="d-flex justify-content-center align-items-center">
                      <CiMail className="fs-5 text-secondary" />
                    </div>
                  </div>
                </div>

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
                      placeholder="Create your password"
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

                <div className="d-grid mb-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg fw-bold py-3 rounded-2"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex justify-content-center p-5">
            <p className="mb-0">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-underline fw-bold">
                Sign in
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

export default Register;
