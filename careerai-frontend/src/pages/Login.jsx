import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("Login Response:", response.data);

      localStorage.setItem("token", response.data.token);

      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      const role =
        response.data.user?.role ||
        response.data.role;

      if (role === "JOB_SEEKER") {
        navigate("/job-seeker/dashboard");
      } else if (role === "RECRUITER") {
        navigate("/recruiter/dashboard");
      } else if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("Login Error:", err);

      if (err.response) {
        setError(
          err.response.data?.message ||
          "Invalid email or password"
        );
      } else {
        setError(
          "Unable to connect to the server"
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* LEFT SIDE */}

      <div className="auth-brand">

        <div className="brand-logo">
          Career<span>AI</span>
        </div>

        <div className="brand-content">

          <div className="brand-badge">
            ✦ AI-Powered Career Platform
          </div>

          <h1>
            Build Your
            <br />
            <span>Dream Career</span>
          </h1>

          <p>
            Discover opportunities, connect with
            recruiters, and take your career to the
            next level with CareerAI.
          </p>

          <div className="feature-list">

            <div className="feature-item">
              <span className="feature-icon">✦</span>
              <div>
                <strong>Smart Job Discovery</strong>
                <small>
                  Find opportunities that match your skills
                </small>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">◆</span>
              <div>
                <strong>AI Career Guidance</strong>
                <small>
                  Get insights to improve your career
                </small>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <div>
                <strong>Track Applications</strong>
                <small>
                  Manage your complete job journey
                </small>
              </div>
            </div>

          </div>

        </div>

        <div className="brand-footer">
          © 2026 CareerAI. Your career, powered by AI.
        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="auth-form-section">

        <div className="auth-card">

          <div className="mobile-logo">
            Career<span>AI</span>
          </div>

          <div className="auth-heading">

            <div className="welcome-icon">
              👋
            </div>

            <h2>
              Welcome Back
            </h2>

            <p>
              Sign in to continue your career journey
            </p>

          </div>


          {error && (
            <div className="error-message">
              <span>⚠</span>
              {error}
            </div>
          )}


          <form onSubmit={handleLogin}>

            <div className="input-group">

              <label>
                Email Address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

            </div>


            <div className="input-group">

              <div className="label-row">

                <label>
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password"
                >
                  Forgot password?
                </button>

              </div>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

              </div>

            </div>


            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span>→</span>
                </>
              )}

            </button>

          </form>


          <div className="auth-divider">
            <span>OR</span>
          </div>


          <p className="register-link">

            Don't have an account?

            <Link to="/register">
              Create an account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;