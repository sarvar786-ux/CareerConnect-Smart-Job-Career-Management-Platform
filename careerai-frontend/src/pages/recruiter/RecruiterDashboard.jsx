import { useNavigate } from "react-router-dom";
import "./RecruiterDashboard.css";

function RecruiterDashboard() {

  const navigate = useNavigate();

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };


  return (

    <div className="recruiter-page">

      {/* ================================= */}
      {/* SIDEBAR */}
      {/* ================================= */}

      <aside className="recruiter-sidebar">

        {/* LOGO */}

        <div className="recruiter-logo">
          Career<span>AI</span>
        </div>


        {/* MENU */}

        <div className="recruiter-menu">

          {/* DASHBOARD */}

          <button
            className="recruiter-menu-item active"
            onClick={() =>
              navigate("/recruiter/dashboard")
            }
          >
            <span>⌂</span>
            Dashboard
          </button>


          {/* COMPANY PROFILE */}

          <button
            className="recruiter-menu-item"
            onClick={() =>
              navigate("/recruiter/company")
            }
          >
            <span>🏢</span>
            Company Profile
          </button>


          {/* MY JOBS */}

          <button
            className="recruiter-menu-item"
            onClick={() =>
              navigate("/recruiter/jobs")
            }
          >
            <span>💼</span>
            My Jobs
          </button>


          {/* POST A JOB */}

          <button
            className="recruiter-menu-item"
            onClick={() =>
              navigate("/recruiter/jobs/create")
            }
          >
            <span>➕</span>
            Post a Job
          </button>


          {/* APPLICATIONS */}

          <button
            className="recruiter-menu-item"
            onClick={() =>
              navigate("/recruiter/applications")
            }
          >
            <span>📋</span>
            Applications
          </button>

        </div>


        {/* ================================= */}
        {/* LOGOUT */}
        {/* ================================= */}

        <div className="recruiter-sidebar-bottom">

          <button
            className="recruiter-menu-item logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* ================================= */}
      {/* MAIN CONTENT */}
      {/* ================================= */}

      <main className="recruiter-main">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <header className="recruiter-header">

          <div>

            <h1>
              Recruiter Dashboard
            </h1>

            <p>
              Manage your job postings and
              find the right talent for your team.
            </p>

          </div>

        </header>


        {/* ================================= */}
        {/* STATISTICS */}
        {/* ================================= */}

        <div className="recruiter-stats">

          {/* TOTAL JOBS */}

          <div className="recruiter-stat-card">

            <div className="stat-icon">
              💼
            </div>

            <div>

              <span>
                Total Jobs
              </span>

              <strong>
                0
              </strong>

            </div>

          </div>


          {/* APPLICATIONS */}

          <div className="recruiter-stat-card">

            <div className="stat-icon">
              📋
            </div>

            <div>

              <span>
                Applications
              </span>

              <strong>
                0
              </strong>

            </div>

          </div>


          {/* PENDING */}

          <div className="recruiter-stat-card">

            <div className="stat-icon">
              ⏳
            </div>

            <div>

              <span>
                Pending
              </span>

              <strong>
                0
              </strong>

            </div>

          </div>


          {/* HIRED */}

          <div className="recruiter-stat-card">

            <div className="stat-icon">
              ✓
            </div>

            <div>

              <span>
                Hired
              </span>

              <strong>
                0
              </strong>

            </div>

          </div>

        </div>


        {/* ================================= */}
        {/* QUICK ACTIONS */}
        {/* ================================= */}

        <section className="recruiter-section">

          <div className="section-heading">

            <div>

              <h2>
                Quick Actions
              </h2>

              <p>
                Manage your recruitment activities.
              </p>

            </div>

          </div>


          <div className="quick-actions">

            {/* POST NEW JOB */}

            <button
              className="quick-action-card"
              onClick={() =>
                navigate("/recruiter/jobs/create")
              }
            >

              <div className="quick-action-icon">
                ➕
              </div>

              <div>

                <h3>
                  Post a New Job
                </h3>

                <p>
                  Create a new job opportunity
                  and find talented candidates.
                </p>

              </div>

              <span className="quick-arrow">
                →
              </span>

            </button>


            {/* MANAGE JOBS */}

            <button
              className="quick-action-card"
              onClick={() =>
                navigate("/recruiter/jobs")
              }
            >

              <div className="quick-action-icon">
                💼
              </div>

              <div>

                <h3>
                  Manage Jobs
                </h3>

                <p>
                  View, edit and manage
                  your job postings.
                </p>

              </div>

              <span className="quick-arrow">
                →
              </span>

            </button>


            {/* VIEW APPLICATIONS */}

            <button
              className="quick-action-card"
              onClick={() =>
                navigate("/recruiter/applications")
              }
            >

              <div className="quick-action-icon">
                📋
              </div>

              <div>

                <h3>
                  View Applications
                </h3>

                <p>
                  Review candidates who applied
                  to your job postings.
                </p>

              </div>

              <span className="quick-arrow">
                →
              </span>

            </button>


            {/* COMPANY PROFILE */}

            <button
              className="quick-action-card"
              onClick={() =>
                navigate("/recruiter/company")
              }
            >

              <div className="quick-action-icon">
                🏢
              </div>

              <div>

                <h3>
                  Manage Company
                </h3>

                <p>
                  Create and manage your
                  company profile and information.
                </p>

              </div>

              <span className="quick-arrow">
                →
              </span>

            </button>

          </div>

        </section>


        {/* ================================= */}
        {/* WELCOME CARD */}
        {/* ================================= */}

        <section className="recruiter-welcome-card">

          <div>

            <span className="welcome-badge">
              ✦ CareerAI Recruiter
            </span>

            <h2>
              Find the right talent
              <br />
              for your team.
            </h2>

            <p>
              Post your job opportunities,
              review applications, and connect
              with talented professionals.
            </p>

            <button
              onClick={() =>
                navigate("/recruiter/jobs/create")
              }
            >
              Post Your First Job →
            </button>

          </div>

        </section>

      </main>

    </div>

  );

}

export default RecruiterDashboard;