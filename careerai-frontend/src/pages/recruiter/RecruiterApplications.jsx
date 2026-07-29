import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./RecruiterApplications.css";

function RecruiterApplications() {

  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [updatingId, setUpdatingId] = useState(null);


  // =====================================================
  // FETCH RECRUITER APPLICATIONS
  // =====================================================

  useEffect(() => {

    fetchApplications();

  }, []);


  const fetchApplications = async () => {

    try {

      setLoading(true);
      setError("");

      console.log(
        "Fetching recruiter applications..."
      );

      const response = await api.get(
        "/applications/job/my"
      );

      console.log(
        "Recruiter Applications Response:",
        response.data
      );

      // Make sure response is always an array
      if (Array.isArray(response.data)) {

        setApplications(response.data);

      } else {

        setApplications([]);

      }

    } catch (err) {

      console.error(
        "Recruiter Applications Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to load applications"
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // UPDATE APPLICATION STATUS
  // =====================================================

  const handleStatusUpdate = async (
    applicationId,
    newStatus
  ) => {

    try {

      setUpdatingId(applicationId);

      setError("");

      setSuccess("");

      console.log(
        "Updating application:",
        applicationId
      );

      console.log(
        "New Status:",
        newStatus
      );


      // =================================================
      // IMPORTANT
      // Backend expects:
      //
      // PUT /applications/{id}/status?status=SHORTLISTED
      //
      // NOT:
      //
      // PUT /applications/{id}/status
      // Body: { status: "SHORTLISTED" }
      // =================================================

      const response = await api.put(

        `/applications/${applicationId}/status`,

        null,

        {
          params: {
            status: newStatus
          }
        }

      );


      console.log(
        "Status Updated Successfully:",
        response.data
      );


      // =================================================
      // UPDATE APPLICATION IN UI
      // =================================================

      setApplications(
        (previousApplications) =>

          previousApplications.map(
            (application) =>

              application.id === applicationId

                ? {
                    ...application,

                    // Use backend response status
                    status:
                      response.data?.status ||
                      newStatus
                  }

                : application
          )

      );


      // =================================================
      // SUCCESS MESSAGE
      // =================================================

      setSuccess(
        `Application status updated to ${formatStatus(
          newStatus
        )}`
      );


    } catch (err) {

      console.error(
        "Update Application Status Error:",
        err
      );

      console.error(
        "Backend Error Response:",
        err.response?.data
      );


      setError(

        err.response?.data?.message ||

        err.response?.data ||

        "Unable to update application status"

      );

    } finally {

      setUpdatingId(null);

    }

  };


  // =====================================================
  // FORMAT STATUS
  // =====================================================

  const formatStatus = (status) => {

    if (!status) {

      return "Pending";

    }

    return status
      .toString()
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(
        /\b\w/g,
        (char) =>
          char.toUpperCase()
      );

  };


  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {

    if (!status) {

      return "recruiter-applications-status-pending";

    }

    switch (
      status
        .toString()
        .toUpperCase()
    ) {

      case "SHORTLISTED":

        return "recruiter-applications-status-shortlisted";


      case "REJECTED":

        return "recruiter-applications-status-rejected";


      case "HIRED":

        return "recruiter-applications-status-hired";


      case "PENDING":

      default:

        return "recruiter-applications-status-pending";

    }

  };


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="recruiter-applications-loading-page">

        <div className="recruiter-applications-spinner"></div>

        <p>
          Loading applications...
        </p>

      </div>

    );

  }


  // =====================================================
  // MAIN UI
  // =====================================================

  return (

    <div className="recruiter-applications-page">


      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <aside className="recruiter-applications-sidebar">


        {/* LOGO */}

        <div className="recruiter-applications-logo">

          Career<span>AI</span>

        </div>


        {/* MENU */}

        <div className="recruiter-applications-menu">


          {/* DASHBOARD */}

          <button
            className="recruiter-applications-menu-item"
            onClick={() =>
              navigate(
                "/recruiter/dashboard"
              )
            }
          >

            <span>
              ⌂
            </span>

            Dashboard

          </button>


          {/* MY COMPANY */}

          <button
            className="recruiter-applications-menu-item"
            onClick={() =>
              navigate(
                "/recruiter/company"
              )
            }
          >

            <span>
              🏢
            </span>

            My Company

          </button>


          {/* MY JOBS */}

          <button
            className="recruiter-applications-menu-item"
            onClick={() =>
              navigate(
                "/recruiter/jobs"
              )
            }
          >

            <span>
              💼
            </span>

            My Jobs

          </button>


          {/* POST JOB */}

          <button
            className="recruiter-applications-menu-item"
            onClick={() =>
              navigate(
                "/recruiter/jobs/create"
              )
            }
          >

            <span>
              ➕
            </span>

            Post a Job

          </button>


          {/* APPLICATIONS */}

          <button
            className="recruiter-applications-menu-item active"
          >

            <span>
              📋
            </span>

            Applications

          </button>


        </div>


        {/* LOGOUT */}

        <div className="recruiter-applications-sidebar-bottom">

          <button
            className="recruiter-applications-menu-item logout"
            onClick={handleLogout}
          >

            <span>
              ↪
            </span>

            Logout

          </button>

        </div>


      </aside>


      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <main className="recruiter-applications-main">


        {/* HEADER */}

        <header className="recruiter-applications-header">

          <div>

            <h1>
              Applications
            </h1>

            <p>
              Review candidates who applied
              to your job postings.
            </p>

          </div>


          <div className="recruiter-applications-count">

            <span>
              Total Applications
            </span>

            <strong>
              {applications.length}
            </strong>

          </div>

        </header>


        {/* ================================================= */}
        {/* ERROR MESSAGE */}
        {/* ================================================= */}

        {error && (

          <div className="recruiter-applications-error">

            ⚠

            <span>
              {error}
            </span>

          </div>

        )}


        {/* ================================================= */}
        {/* SUCCESS MESSAGE */}
        {/* ================================================= */}

        {success && (

          <div className="recruiter-applications-success">

            ✓

            <span>
              {success}
            </span>

          </div>

        )}


        {/* ================================================= */}
        {/* NO APPLICATIONS */}
        {/* ================================================= */}

        {!error &&
          applications.length === 0 && (

          <div className="recruiter-applications-empty">

            <div className="recruiter-applications-empty-icon">
              📋
            </div>

            <h2>
              No Applications Yet
            </h2>

            <p>
              Applications from candidates
              will appear here when they apply
              for your jobs.
            </p>

            <button
              onClick={() =>
                navigate(
                  "/recruiter/jobs"
                )
              }
            >
              View My Jobs →
            </button>

          </div>

        )}


        {/* ================================================= */}
        {/* APPLICATION LIST */}
        {/* ================================================= */}

        {applications.length > 0 && (

          <div className="recruiter-applications-list">


            {applications.map(
              (application) => (

              <div
                className="recruiter-application-card"
                key={application.id}
              >


                {/* ================================================= */}
                {/* CARD HEADER */}
                {/* ================================================= */}

                <div className="recruiter-application-card-header">


                  <div className="recruiter-application-candidate">


                    <div className="recruiter-application-avatar">

                      {(
                        application.userName ||
                        application.applicantName ||
                        "C"
                      )
                        .charAt(0)
                        .toUpperCase()}

                    </div>


                    <div>

                      <h2>

                        {application.userName ||
                          application.applicantName ||
                          "Candidate"}

                      </h2>

                      <p>

                        {application.userEmail ||
                          application.applicantEmail ||
                          "Email not available"}

                      </p>

                    </div>


                  </div>


                  {/* STATUS BADGE */}

                  <span
                    className={`recruiter-applications-status ${getStatusClass(
                      application.status
                    )}`}
                  >

                    {formatStatus(
                      application.status
                    )}

                  </span>


                </div>


                {/* ================================================= */}
                {/* JOB INFORMATION */}
                {/* ================================================= */}

                <div className="recruiter-application-job-info">


                  <div className="recruiter-application-info-item">

                    <span>
                      💼
                    </span>

                    <div>

                      <small>
                        Applied For
                      </small>

                      <strong>

                        {application.jobTitle ||
                          application.job?.title ||
                          "Job Position"}

                      </strong>

                    </div>

                  </div>


                  <div className="recruiter-application-info-item">

                    <span>
                      📅
                    </span>

                    <div>

                      <small>
                        Application ID
                      </small>

                      <strong>
                        #{application.id}
                      </strong>

                    </div>

                  </div>


                </div>


                {/* ================================================= */}
                {/* APPLICATION DETAILS */}
                {/* ================================================= */}

                <div className="recruiter-application-details">


                  {/* COVER LETTER */}

                  {application.coverLetter && (

                    <div>

                      <h3>
                        Cover Letter
                      </h3>

                      <p>
                        {application.coverLetter}
                      </p>

                    </div>

                  )}


                  {/* RESUME */}

                  {application.resumeUrl && (

                    <a
                      href={
                        application.resumeUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="recruiter-application-resume-button"
                    >

                      📄 View Resume

                    </a>

                  )}


                </div>


                {/* ================================================= */}
                {/* STATUS ACTIONS */}
                {/* ================================================= */}

                <div className="recruiter-application-actions">


                  <div>

                    <label>
                      Update Application Status
                    </label>


                    <select
                      value={
                        application.status ||
                        "PENDING"
                      }
                      disabled={
                        updatingId ===
                        application.id
                      }
                      onChange={(e) =>
                        handleStatusUpdate(
                          application.id,
                          e.target.value
                        )
                      }
                    >

                      <option value="PENDING">
                        Pending
                      </option>

                      <option value="SHORTLISTED">
                        Shortlisted
                      </option>

                      <option value="REJECTED">
                        Rejected
                      </option>

                      <option value="HIRED">
                        Hired
                      </option>

                    </select>

                  </div>


                  {/* UPDATING MESSAGE */}

                  {updatingId ===
                    application.id && (

                    <span className="recruiter-application-updating">

                      Updating...

                    </span>

                  )}


                </div>


              </div>

            ))}


          </div>

        )}


      </main>


    </div>

  );

}

export default RecruiterApplications;