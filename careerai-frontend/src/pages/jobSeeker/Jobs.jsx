import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Jobs.css";

function Jobs() {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================
  // FETCH ALL JOBS
  // =========================================

  useEffect(() => {

    const fetchJobs = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await api.get("/jobs");

        console.log("Jobs Response:", response.data);

        setJobs(response.data);

      } catch (err) {

        console.error("Jobs Error:", err);

        setError(
          err.response?.data?.message ||
          "Unable to load jobs"
        );

      } finally {

        setLoading(false);

      }
    };

    fetchJobs();

  }, []);


  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };


  return (

    <div className="jobs-page">

      {/* ================================= */}
      {/* SIDEBAR */}
      {/* ================================= */}

      <aside className="jobs-sidebar">

        <div className="jobs-logo">
          Career<span>AI</span>
        </div>


        <div className="jobs-menu">

          <button
            className="jobs-menu-item"
            onClick={() =>
              navigate("/job-seeker/dashboard")
            }
          >
            <span>⌂</span>
            Dashboard
          </button>


          <button
            className="jobs-menu-item active"
          >
            <span>💼</span>
            Find Jobs
          </button>


          <button
            className="jobs-menu-item"
            onClick={() =>
              navigate("/job-seeker/applications")
            }
          >
            <span>📋</span>
            My Applications
          </button>

        </div>


        <div className="jobs-sidebar-bottom">

          <button
            className="jobs-menu-item logout"
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

      <main className="jobs-main">


        {/* HEADER */}

        <header className="jobs-header">

          <div>

            <h1>
              Find Your Next Opportunity
            </h1>

            <p>
              Discover jobs that match your skills
              and career goals.
            </p>

          </div>

        </header>


        {/* ================================= */}
        {/* SEARCH */}
        {/* ================================= */}

        <div className="jobs-search">

          <span>
            🔍
          </span>

          <input
            type="text"
            placeholder="Search jobs by title, location or company..."
          />

        </div>


        {/* ================================= */}
        {/* LOADING */}
        {/* ================================= */}

        {loading && (

          <div className="jobs-loading">

            <div className="jobs-spinner"></div>

            <p>
              Loading available jobs...
            </p>

          </div>

        )}


        {/* ================================= */}
        {/* ERROR */}
        {/* ================================= */}

        {!loading && error && (

          <div className="jobs-error">

            <span>⚠</span>

            <p>
              {error}
            </p>

          </div>

        )}


        {/* ================================= */}
        {/* NO JOBS */}
        {/* ================================= */}

        {!loading &&
          !error &&
          jobs.length === 0 && (

            <div className="no-jobs">

              <div>
                🔍
              </div>

              <h2>
                No Jobs Available
              </h2>

              <p>
                There are currently no job openings.
                Please check again later.
              </p>

            </div>

        )}


        {/* ================================= */}
        {/* JOB CARDS */}
        {/* ================================= */}

        {!loading &&
          !error &&
          jobs.length > 0 && (

            <div className="jobs-grid">

              {jobs.map((job) => (

                <div
                  className="job-card"
                  key={job.id}
                >

                  {/* CARD HEADER */}

                  <div className="job-card-header">

                    <div className="company-logo">
                      {job.company?.companyName
                        ? job.company.companyName
                            .charAt(0)
                            .toUpperCase()
                        : "C"}
                    </div>

                    <div>

                      <h2>
                        {job.title}
                      </h2>

                      <p>
                        {job.company?.companyName ||
                          "Company"}
                      </p>

                    </div>

                  </div>


                  {/* JOB DETAILS */}

                  <div className="job-details">

                    <span>
                      📍 {job.location || "Remote"}
                    </span>

                    <span>
                      💼 {job.jobType || "Full Time"}
                    </span>

                  </div>


                  {/* DESCRIPTION */}

                  <p className="job-description">

                    {job.description ||
                      "No description available."}

                  </p>


                  {/* FOOTER */}

                  <div className="job-card-footer">

                    <span className="job-posted">
                      Recently Posted
                    </span>

                    <button
                      className="apply-button"
                      onClick={() => {

                        // Temporary navigation
                        // We will build Apply page next

                        navigate(
                          `/job-seeker/jobs/${job.id}`
                        );

                      }}
                    >
                      View Job →
                    </button>

                  </div>

                </div>

              ))}

            </div>

        )}

      </main>

    </div>

  );

}

export default Jobs;