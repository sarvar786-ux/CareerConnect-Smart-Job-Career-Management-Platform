import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "JOB_SEEKER",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Registration failed. Please try again."
        );

        return;
      }

      alert("Registration successful! Please login.");

      navigate("/login");
    } catch (error) {
      console.error(
        "Registration Error:",
        error
      );

      setError(
        "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* ================================= */}
      {/* LEFT BRAND SECTION */}
      {/* ================================= */}

      <div className="auth-brand">

        <div className="brand-logo">
          Career<span>AI</span>
        </div>

        <div className="brand-content">

          <div className="brand-badge">
            ✦ Join the Future of Careers
          </div>

          <h1>
            Start Your
            <br />
            <span>Career Journey</span>
          </h1>

          <p>
            Create your CareerAI account and unlock
            smarter job discovery, AI-powered career
            guidance, and a better way to manage your
            professional journey.
          </p>

          <div className="feature-list">

            <div className="feature-item">

              <span className="feature-icon">
                🚀
              </span>

              <div>
                <strong>
                  Discover Opportunities
                </strong>

                <small>
                  Find jobs that match your skills
                  and career goals
                </small>
              </div>

            </div>


            <div className="feature-item">

              <span className="feature-icon">
                🤖
              </span>

              <div>
                <strong>
                  AI-Powered Guidance
                </strong>

                <small>
                  Get intelligent insights to grow
                  your career
                </small>
              </div>

            </div>


            <div className="feature-item">

              <span className="feature-icon">
                📈
              </span>

              <div>
                <strong>
                  Grow Your Career
                </strong>

                <small>
                  Build your profile and connect
                  with opportunities
                </small>
              </div>

            </div>

          </div>

        </div>

        <div className="brand-footer">
          © 2026 CareerAI. Your career, powered by AI.
        </div>

      </div>


      {/* ================================= */}
      {/* RIGHT REGISTER SECTION */}
      {/* ================================= */}

      <div className="auth-form-section">

        <div className="auth-card register-card">

          {/* MOBILE LOGO */}

          <div className="mobile-logo">
            Career<span>AI</span>
          </div>


          {/* HEADING */}

          <div className="auth-heading">

            <div className="welcome-icon">
              ✨
            </div>

            <h2>
              Create Account
            </h2>

            <p>
              Join CareerAI and build your future
            </p>

          </div>


          {/* ERROR */}

          {error && (
            <div className="error-message">

              <span>⚠</span>

              {error}

            </div>
          )}


          {/* REGISTER FORM */}

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="input-group">

              <label>
                Full Name
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  👤
                </span>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* EMAIL */}

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
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="input-group">

              <label>
                Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* ROLE */}

            <div className="input-group">

              <label>
                I want to register as
              </label>

              <div className="role-selection">

                <label
                  className={`role-option ${
                    formData.role === "JOB_SEEKER"
                      ? "active"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="role"
                    value="JOB_SEEKER"
                    checked={
                      formData.role === "JOB_SEEKER"
                    }
                    onChange={handleChange}
                  />

                  <span className="role-icon">
                    👨‍💻
                  </span>

                  <span>
                    Job Seeker
                  </span>

                </label>


                <label
                  className={`role-option ${
                    formData.role === "RECRUITER"
                      ? "active"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="role"
                    value="RECRUITER"
                    checked={
                      formData.role === "RECRUITER"
                    }
                    onChange={handleChange}
                  />

                  <span className="role-icon">
                    💼
                  </span>

                  <span>
                    Recruiter
                  </span>

                </label>

              </div>

            </div>


            {/* REGISTER BUTTON */}

            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <span>→</span>
                </>
              )}

            </button>

          </form>


          {/* LOGIN LINK */}

          <div className="auth-divider">
            <span>OR</span>
          </div>


          <p className="register-link">

            Already have an account?

            <Link to="/login">
              Sign in
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;