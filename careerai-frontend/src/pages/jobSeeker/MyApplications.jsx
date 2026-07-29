import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./MyApplications.css";

function MyApplications() {

  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // =========================================
  // FETCH MY APPLICATIONS
  // =========================================

  useEffect(() => {

    const fetchApplications = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await api.get("/applications/my");

        console.log(
          "My Applications Response:",
          response.data
        );

        setApplications(response.data);

      } catch (err) {

        console.error(
          "My Applications Error:",
          err
        );

        setError(
          err.response?.data?.message ||
          "Unable to load your applications"
        );

      } finally {

        setLoading(false);

      }

    };

    fetchApplications();

  }, []);


  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };


  // =========================================
  // STATUS CLASS
  // =========================================

  const getStatusClass = (status) => {

    switch (status?.toUpperCase()) {

      case "PENDING":
        return "status-pending";

      case "REVIEWING":
        return "status-reviewing";

      case "ACCEPTED":
        return "status-accepted";

      case "REJECTED":
        return "status-rejected";

      default:
        return "status-default";

    }

  };


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <div className="applications-loading">

        <div className="applications-spinner"></div>

        <p>
          Loading your applications...
        </p>

      </div>

    );

  }


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
            className="jobs-menu-item"
            onClick={() =>
              navigate("/job-seeker/jobs")
            }
          >
            <span>💼</span>
            Find Jobs
          </button>


          <button
            className="jobs-menu-item active"
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

      <main className="applications-main">

        {/* HEADER */}

        <header className="applications-header">

          <div>

            <h1>
              My Applications
            </h1>

            <p>
              Track and manage your job applications.
            </p>

          </div>

          <div className="applications-count">

            <strong>
              {applications.length}
            </strong>

            <span>
              {applications.length === 1 ? " Application" : " Applications"}
            </span>

          </div>

        </header>


        {/* ================================= */}
        {/* ERROR */}
        {/* ================================= */}

        {error && (

          <div className="applications-error">

            <span>⚠</span>

            <p>
              {error}
            </p>

          </div>

        )}


        {/* ================================= */}
        {/* NO APPLICATIONS */}
        {/* ================================= */}

        {!error &&
          applications.length === 0 && (

            <div className="no-applications">

              <div className="no-applications-icon">
                📋
              </div>

              <h2>
                No Applications Yet
              </h2>

              <p>
                You haven't applied for any jobs yet.
                Start exploring opportunities and apply
                for your dream job.
              </p>

              <button
                onClick={() =>
                  navigate("/job-seeker/jobs")
                }
              >
                Find Jobs →
              </button>

            </div>

        )}


        {/* ================================= */}
        {/* APPLICATION CARDS */}
        {/* ================================= */}

        {!error &&
          applications.length > 0 && (

            <div className="applications-grid">

              {applications.map((application) => (

                <div
                  className="application-card"
                  key={application.id}
                >

                  {/* CARD HEADER */}

                  <div className="application-card-header">

                    <div className="application-company-logo">

                      {application.companyName
                        ? application.companyName
                            .charAt(0)
                            .toUpperCase()
                        : "C"}

                    </div>


                    <div className="application-job-info">

                      <h2>
                        {application.jobTitle ||
                          "Job Title"}
                      </h2>

                      <p>
                        {application.companyName ||
                          "Company"}
                      </p>

                    </div>

                  </div>


                  {/* APPLICATION DETAILS */}

                  <div className="application-details">

                    <div className="application-detail">

                      <span>
                        📅
                      </span>

                      <div>

                        <small>
                          Applied On
                        </small>

                        <strong>
                          {application.appliedAt
                            ?  new Date(
                                application.appliedAt
                              ).toLocaleDateString()
                            : " Not Available"}
                        </strong>

                      </div>

                    </div>


                    <div className="application-detail">

                      <span>
                        📌
                      </span>

                      <div>

                        <small>
                          Status
                        </small>

                        <strong
                          className={
                            getStatusClass(
                              application.status
                            )
                          }
                        >
                          {application.status ||
                            "PENDING"}
                        </strong>

                      </div>

                    </div>

                  </div>


                  {/* COVER LETTER */}

                  {application.coverLetter && (

                    <div className="application-cover-letter">

                      <small>
                        Cover Letter
                      </small>

                      <p>
                        {application.coverLetter}
                      </p>

                    </div>

                  )}


                  {/* FOOTER */}

                  <div className="application-card-footer">

                    <span>
                      Application ID: #
                      {application.id}
                    </span>

                    <button
                      onClick={() =>
                        navigate(
                          `/job-seeker/jobs/${application.jobId}`
                        )
                      }
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

export default MyApplications;