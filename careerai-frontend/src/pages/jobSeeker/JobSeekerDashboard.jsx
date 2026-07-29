import { useNavigate } from "react-router-dom";

function JobSeekerDashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-page">

      {/* ================= SIDEBAR ================= */}

      <aside className="dashboard-sidebar">

        <div className="dashboard-logo">
          Career<span>AI</span>
        </div>

        <div className="sidebar-menu">

          <button className="sidebar-item active">
            <span>▦</span>
            Dashboard
          </button>

          <button
            className="sidebar-item"
            onClick={() => navigate("/job-seeker/jobs")}
          >
            <span>🔍</span>
            Find Jobs
          </button>

          <button
            className="sidebar-item"
            onClick={() =>
              navigate("/job-seeker/applications")
            }
          >
            <span>📄</span>
            My Applications
          </button>

          <button className="sidebar-item">
            <span>♡</span>
            Saved Jobs
          </button>

          <button className="sidebar-item">
            <span>✦</span>
            AI Career Coach
          </button>

          <button className="sidebar-item">
            <span>👤</span>
            My Profile
          </button>

        </div>

        <div className="sidebar-bottom">

          <div className="sidebar-user">

            <div className="user-avatar">
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}
            </div>

            <div>
              <strong>
                {user.name || "Job Seeker"}
              </strong>

              <small>
                Job Seeker
              </small>
            </div>

          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            ⇥ Logout
          </button>

        </div>

      </aside>


      {/* ================= MAIN CONTENT ================= */}

      <main className="dashboard-main">

        {/* TOP NAVBAR */}

        <header className="dashboard-header">

          <div>
            <h2>Dashboard</h2>
            <p>
              Manage your career and discover new opportunities.
            </p>
          </div>

          <div className="header-actions">

            <button className="notification-button">
              🔔
            </button>

            <div className="header-avatar">
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}
            </div>

          </div>

        </header>


        {/* WELCOME BANNER */}

        <section className="welcome-banner">

          <div>

            <span className="welcome-label">
              ✦ AI-Powered Career Platform
            </span>

            <h1>
              Welcome back,
              <span>
                {" "}
                {user.name || "Job Seeker"}!
              </span>
            </h1>

            <p>
              Your next career opportunity could be just
              one step away. Let's find it together.
            </p>

            <button
              className="primary-action"
              onClick={() =>
                navigate("/job-seeker/jobs")
              }
            >
              Explore Jobs →
            </button>

          </div>

          <div className="welcome-decoration">
            ✦
          </div>

        </section>


        {/* STATISTICS */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon purple">
              🔍
            </div>

            <div>
              <span>Recommended Jobs</span>
              <strong>24</strong>
            </div>

            <small className="stat-positive">
              +8 this week
            </small>

          </div>


          <div className="stat-card">

            <div className="stat-icon blue">
              📄
            </div>

            <div>
              <span>Applications</span>
              <strong>12</strong>
            </div>

            <small className="stat-positive">
              3 active
            </small>

          </div>


          <div className="stat-card">

            <div className="stat-icon green">
              ✓
            </div>

            <div>
              <span>Interviews</span>
              <strong>4</strong>
            </div>

            <small className="stat-positive">
              +2 this month
            </small>

          </div>


          <div className="stat-card">

            <div className="stat-icon orange">
              ♡
            </div>

            <div>
              <span>Saved Jobs</span>
              <strong>8</strong>
            </div>

            <small>
              Keep exploring
            </small>

          </div>

        </section>


        {/* DASHBOARD GRID */}

        <section className="dashboard-grid">


          {/* PROFILE COMPLETION */}

          <div className="dashboard-card profile-card">

            <div className="card-header">

              <div>
                <h3>Complete Your Profile</h3>

                <p>
                  A complete profile helps recruiters
                  discover you.
                </p>
              </div>

              <span className="profile-percentage">
                70%
              </span>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{ width: "70%" }}
              />

            </div>

            <div className="profile-tasks">

              <div className="completed">
                ✓ Basic information
              </div>

              <div className="completed">
                ✓ Email verified
              </div>

              <div>
                ○ Add your skills
              </div>

              <div>
                ○ Upload your resume
              </div>

            </div>

            <button className="secondary-action">
              Complete Profile →
            </button>

          </div>


          {/* AI CAREER CARD */}

          <div className="dashboard-card ai-card">

            <div className="ai-icon">
              ✦
            </div>

            <h3>
              AI Career Coach
            </h3>

            <p>
              Get personalised career insights,
              skill recommendations and job guidance
              powered by AI.
            </p>

            <button className="ai-button">
              Talk to AI Coach →
            </button>

          </div>

        </section>


        {/* RECOMMENDED JOBS */}

        <section className="jobs-section">

          <div className="section-header">

            <div>
              <h2>Recommended Jobs</h2>

              <p>
                Opportunities matched to your profile
              </p>
            </div>

            <button
              className="view-all"
              onClick={() =>
                navigate("/job-seeker/jobs")
              }
            >
              View All →
            </button>

          </div>


          <div className="job-cards">


            <div className="job-card">

              <div className="company-logo">
                T
              </div>

              <div className="job-info">

                <h3>
                  Junior Data Scientist
                </h3>

                <p>
                  Tech Innovations Pvt Ltd
                </p>

                <div className="job-details">
                  <span>📍 Hyderabad</span>
                  <span>💼 Full Time</span>
                </div>

              </div>

              <button className="save-job">
                ♡
              </button>

            </div>


            <div className="job-card">

              <div className="company-logo">
                A
              </div>

              <div className="job-info">

                <h3>
                  Full Stack Developer
                </h3>

                <p>
                  AI Solutions India
                </p>

                <div className="job-details">
                  <span>📍 Bangalore</span>
                  <span>💼 Full Time</span>
                </div>

              </div>

              <button className="save-job">
                ♡
              </button>

            </div>


            <div className="job-card">

              <div className="company-logo">
                G
              </div>

              <div className="job-info">

                <h3>
                  AI / ML Engineer
                </h3>

                <p>
                  Global Tech Labs
                </p>

                <div className="job-details">
                  <span>📍 Remote</span>
                  <span>💼 Full Time</span>
                </div>

              </div>

              <button className="save-job">
                ♡
              </button>

            </div>

          </div>

        </section>


        {/* LOGIN STATUS */}

        <div className="dashboard-footer">

          <span>
            ●
          </span>

          {token
            ? "You are securely logged in"
            : "Session expired"}

        </div>

      </main>

    </div>
  );
}

export default JobSeekerDashboard;