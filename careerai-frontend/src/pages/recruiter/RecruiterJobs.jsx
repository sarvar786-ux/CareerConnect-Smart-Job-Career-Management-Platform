import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./RecruiterJobs.css";

function RecruiterJobs() {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  // =========================================
  // FETCH RECRUITER JOBS
  // =========================================

  useEffect(() => {
    fetchMyJobs();
  }, []);


  const fetchMyJobs = async () => {

    try {

      setLoading(true);
      setError("");

      /*
       * First get the logged-in recruiter's company.
       */
      const companyResponse =
        await api.get("/companies/my");

      const companies =
        companyResponse.data;

      /*
       * If recruiter has no company
       */
      if (
        !companies ||
        companies.length === 0
      ) {

        setJobs([]);
        return;

      }

      /*
       * Currently one company per recruiter.
       */
      const companyId =
        companies[0].id;

      /*
       * Get jobs belonging to company.
       */
      const jobsResponse =
        await api.get(
          `/jobs/company/${companyId}`
        );

      setJobs(
        jobsResponse.data || []
      );

    } catch (err) {

      console.error(
        "Fetch Jobs Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to load your jobs"
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================================
  // DELETE JOB
  // =========================================

  const handleDeleteJob = async (jobId) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this job?"
      );

    if (!confirmed) {
      return;
    }

    try {

      setDeletingId(jobId);
      setError("");
      setSuccess("");

      await api.delete(
        `/jobs/${jobId}`
      );

      /*
       * Remove deleted job from UI
       * without refreshing the page.
       */
      setJobs((prevJobs) =>
        prevJobs.filter(
          (job) =>
            job.id !== jobId
        )
      );

      setSuccess(
        "Job deleted successfully!"
      );

    } catch (err) {

      console.error(
        "Delete Job Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to delete job"
      );

    } finally {

      setDeletingId(null);

    }

  };


  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <div className="recruiter-jobs-loading">

        <div className="recruiter-jobs-spinner"></div>

        <p>
          Loading your jobs...
        </p>

      </div>

    );

  }


  return (

    <div className="recruiter-jobs-page">


      {/* ================================= */}
      {/* SIDEBAR */}
      {/* ================================= */}

      <aside className="recruiter-jobs-sidebar">

        {/* LOGO */}

        <div className="recruiter-jobs-logo">
          Career<span>AI</span>
        </div>


        {/* MENU */}

        <div className="recruiter-jobs-menu">


          {/* DASHBOARD */}

          <button
            className="recruiter-jobs-menu-item"
            onClick={() =>
              navigate(
                "/recruiter/dashboard"
              )
            }
          >

            <span>⌂</span>

            Dashboard

          </button>


          {/* COMPANY */}

          <button
            className="recruiter-jobs-menu-item"
            onClick={() =>
              navigate(
                "/recruiter/company"
              )
            }
          >

            <span>🏢</span>

            My Company

          </button>


          {/* MANAGE JOBS */}

          <button
            className="recruiter-jobs-menu-item active"
          >

            <span>💼</span>

            Manage Jobs

          </button>


          {/* POST JOB */}

          <button
            className="recruiter-jobs-menu-item"
            onClick={() =>
              navigate(
                "/recruiter/jobs/create"
              )
            }
          >

            <span>➕</span>

            Post a Job

          </button>


          {/* APPLICATIONS */}

          <button
            className="recruiter-jobs-menu-item"
            onClick={() =>
              navigate(
                "/recruiter/applications"
              )
            }
          >

            <span>📋</span>

            Applications

          </button>


        </div>


        {/* LOGOUT */}

        <div className="recruiter-jobs-sidebar-bottom">

          <button
            className="recruiter-jobs-menu-item logout"
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

      <main className="recruiter-jobs-main">


        {/* HEADER */}

        <header className="recruiter-jobs-header">

          <div>

            <h1>
              Manage Jobs
            </h1>

            <p>
              View and manage all your job postings.
            </p>

          </div>


          <button
            className="recruiter-jobs-post-button"
            onClick={() =>
              navigate(
                "/recruiter/jobs/create"
              )
            }
          >

            ➕ Post New Job

          </button>

        </header>


        {/* ================================= */}
        {/* ERROR MESSAGE */}
        {/* ================================= */}

        {error && (

          <div className="recruiter-jobs-error">

            ⚠ {error}

          </div>

        )}


        {/* ================================= */}
        {/* SUCCESS MESSAGE */}
        {/* ================================= */}

        {success && (

          <div className="recruiter-jobs-success">

            ✓ {success}

          </div>

        )}


        {/* ================================= */}
        {/* NO JOBS */}
        {/* ================================= */}

        {jobs.length === 0 && (

          <div className="recruiter-jobs-empty">

            <div className="recruiter-jobs-empty-icon">
              💼
            </div>

            <h2>
              No Jobs Posted Yet
            </h2>

            <p>
              You haven't posted any job
              opportunities yet.
            </p>

            <button
              onClick={() =>
                navigate(
                  "/recruiter/jobs/create"
                )
              }
            >

              Post Your First Job →

            </button>

          </div>

        )}


        {/* ================================= */}
        {/* JOB LIST */}
        {/* ================================= */}

        {jobs.length > 0 && (

          <div className="recruiter-jobs-list">

            {jobs.map((job) => (

              <div
                className="recruiter-job-card"
                key={job.id}
              >


                {/* JOB HEADER */}

                <div className="recruiter-job-card-header">

                  <div>

                    <h2>
                      {job.title}
                    </h2>

                    <p className="recruiter-job-company">

                      🏢 {job.companyName}

                    </p>

                  </div>


                  <span className="recruiter-job-type">

                    {job.jobType}

                  </span>

                </div>


                {/* JOB DETAILS */}

                <div className="recruiter-job-details">


                  <span>
                    📍 {job.location}
                  </span>


                  <span>
                    🎓 {job.experienceLevel}
                  </span>


                  {(job.salaryMin ||
                    job.salaryMax) && (

                    <span>

                      💰{" "}

                      {job.salaryMin || "—"}

                      {" - "}

                      {job.salaryMax || "—"}

                    </span>

                  )}

                </div>


                {/* DESCRIPTION */}

                <p className="recruiter-job-description">

                  {job.description}

                </p>


                {/* SKILLS */}

                {job.skills && (

                  <div className="recruiter-job-skills">

                    {job.skills
                      .split(",")
                      .map(
                        (
                          skill,
                          index
                        ) => (

                          <span
                            key={index}
                          >

                            {skill.trim()}

                          </span>

                        )
                      )}

                  </div>

                )}


                {/* ACTIONS */}

                <div className="recruiter-job-actions">


                  <button
                    className="recruiter-job-view-button"
                    onClick={() =>
                      navigate(
                        `/job-seeker/jobs/${job.id}`
                      )
                    }
                  >

                    👁 View

                  </button>


                  <button
                    className="recruiter-job-edit-button"
                    onClick={() =>
                      navigate(
                        `/recruiter/jobs/edit/${job.id}`
                      )
                    }
                  >

                    ✏ Edit

                  </button>


                  <button
                    className="recruiter-job-application-button"
                    onClick={() =>
                      navigate(
                        `/recruiter/applications/job/${job.id}`
                      )
                    }
                  >

                    📋 Applications

                  </button>


                  <button
                    className="recruiter-job-delete-button"
                    onClick={() =>
                      handleDeleteJob(job.id)
                    }
                    disabled={
                      deletingId === job.id
                    }
                  >

                    {deletingId === job.id
                      ? "Deleting..."
                      : "🗑 Delete"}

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

export default RecruiterJobs;