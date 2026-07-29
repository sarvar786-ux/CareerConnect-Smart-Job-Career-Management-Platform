import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./MyJobs.css";

function MyJobs() {

  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  // =========================================
  // FETCH COMPANY AND JOBS
  // =========================================

  useEffect(() => {

    fetchMyJobs();

  }, []);


  const fetchMyJobs = async () => {

    try {

      setLoading(true);
      setError("");

      // =====================================
      // GET LOGGED-IN RECRUITER'S COMPANY
      // =====================================

      const companyResponse =
        await api.get("/companies/my");

      console.log(
        "My Company Response:",
        companyResponse.data
      );


      // =====================================
      // CHECK COMPANY EXISTS
      // =====================================

      if (
        !companyResponse.data ||
        companyResponse.data.length === 0
      ) {

        setCompany(null);
        setJobs([]);

        return;

      }


      // =====================================
      // GET COMPANY
      // =====================================

      const myCompany =
        companyResponse.data[0];

      setCompany(myCompany);


      // =====================================
      // GET JOBS OF THIS COMPANY
      // =====================================

      const jobsResponse =
        await api.get(
          `/jobs/company/${myCompany.id}`
        );

      console.log(
        "My Jobs Response:",
        jobsResponse.data
      );


      setJobs(
        jobsResponse.data || []
      );


    } catch (err) {

      console.error(
        "Fetch My Jobs Error:",
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

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this job?"
      );

    if (!confirmDelete) {
      return;
    }


    try {

      setDeleting(true);
      setError("");
      setSuccess("");


      await api.delete(
        `/jobs/${jobId}`
      );


      // Remove deleted job from UI
      setJobs((prevJobs) =>
        prevJobs.filter(
          (job) => job.id !== jobId
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

      setDeleting(false);

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

      <div className="careerai-myjobs-loading">

        <div className="careerai-myjobs-spinner"></div>

        <p>
          Loading your jobs...
        </p>

      </div>

    );

  }


  return (

    <div className="careerai-myjobs-page">


      {/* ================================= */}
      {/* SIDEBAR */}
      {/* ================================= */}

      <aside className="careerai-myjobs-sidebar">


        {/* LOGO */}

        <div className="careerai-myjobs-logo">

          Career<span>AI</span>

        </div>


        {/* MENU */}

        <div className="careerai-myjobs-menu">


          {/* DASHBOARD */}

          <button
            className="careerai-myjobs-menu-item"
            onClick={() =>
              navigate("/recruiter/dashboard")
            }
          >

            <span>⌂</span>

            Dashboard

          </button>


          {/* MY COMPANY */}

          <button
            className="careerai-myjobs-menu-item"
            onClick={() =>
              navigate("/recruiter/company")
            }
          >

            <span>🏢</span>

            My Company

          </button>


          {/* MY JOBS */}

          <button
            className="careerai-myjobs-menu-item active"
          >

            <span>💼</span>

            My Jobs

          </button>


          {/* POST JOB */}

          <button
            className="careerai-myjobs-menu-item"
            onClick={() =>
              navigate("/recruiter/jobs/create")
            }
          >

            <span>➕</span>

            Post a Job

          </button>


          {/* APPLICATIONS */}

          <button
            className="careerai-myjobs-menu-item"
            onClick={() =>
              navigate("/recruiter/applications")
            }
          >

            <span>📋</span>

            Applications

          </button>


        </div>


        {/* LOGOUT */}

        <div className="careerai-myjobs-sidebar-bottom">

          <button
            className="careerai-myjobs-menu-item logout"
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

      <main className="careerai-myjobs-main">


        {/* HEADER */}

        <header className="careerai-myjobs-header">

          <div>

            <h1>
              My Jobs
            </h1>

            <p>
              Manage your job postings and
              find the right talent for your team.
            </p>

          </div>


          <button
            className="careerai-myjobs-post-button"
            onClick={() =>
              navigate("/recruiter/jobs/create")
            }
          >

            ➕ Post a New Job

          </button>

        </header>



        {/* ================================= */}
        {/* COMPANY INFORMATION */}
        {/* ================================= */}

        {company && (

          <div className="careerai-myjobs-company-banner">

            <div className="careerai-myjobs-company-icon">

              {company.companyName
                ?.charAt(0)
                .toUpperCase() || "C"}

            </div>


            <div>

              <h2>
                {company.companyName}
              </h2>

              <p>
                {company.location ||
                  "Location not specified"}
              </p>

            </div>


            <div className="careerai-myjobs-company-count">

              <strong>
                {jobs.length}
              </strong>

              <span>
                Active Jobs
              </span>

            </div>

          </div>

        )}



        {/* ================================= */}
        {/* ERROR MESSAGE */}
        {/* ================================= */}

        {error && (

          <div className="careerai-myjobs-error">

            ⚠ {error}

          </div>

        )}



        {/* ================================= */}
        {/* SUCCESS MESSAGE */}
        {/* ================================= */}

        {success && (

          <div className="careerai-myjobs-success">

            ✓ {success}

          </div>

        )}



        {/* ================================= */}
        {/* NO COMPANY */}
        {/* ================================= */}

        {!company && (

          <div className="careerai-myjobs-empty">

            <div className="careerai-myjobs-empty-icon">
              🏢
            </div>

            <h2>
              Create Your Company First
            </h2>

            <p>
              You need to create your company
              profile before posting jobs.
            </p>

            <button
              onClick={() =>
                navigate("/recruiter/company")
              }
            >
              Create Company →
            </button>

          </div>

        )}



        {/* ================================= */}
        {/* NO JOBS */}
        {/* ================================= */}

        {company && jobs.length === 0 && (

          <div className="careerai-myjobs-empty">

            <div className="careerai-myjobs-empty-icon">
              💼
            </div>

            <h2>
              No Jobs Posted Yet
            </h2>

            <p>
              You haven't posted any jobs yet.
              Create your first job opportunity
              to start finding talented candidates.
            </p>

            <button
              onClick={() =>
                navigate("/recruiter/jobs/create")
              }
            >
              Post Your First Job →
            </button>

          </div>

        )}



        {/* ================================= */}
        {/* JOBS GRID */}
        {/* ================================= */}

        {company && jobs.length > 0 && (

          <div className="careerai-myjobs-grid">


            {jobs.map((job) => (

              <div
                className="careerai-myjobs-card"
                key={job.id}
              >


                {/* JOB HEADER */}

                <div className="careerai-myjobs-card-header">

                  <div className="careerai-myjobs-job-icon">

                    {job.title
                      ?.charAt(0)
                      .toUpperCase() || "J"}

                  </div>


                  <div>

                    <h2>
                      {job.title}
                    </h2>

                    <p>
                      {job.companyName ||
                        company.companyName}
                    </p>

                  </div>

                </div>



                {/* JOB DETAILS */}

                <div className="careerai-myjobs-details">


                  <div className="careerai-myjobs-detail">

                    <span>
                      📍
                    </span>

                    <p>
                      {job.location ||
                        "Location not specified"}
                    </p>

                  </div>


                  <div className="careerai-myjobs-detail">

                    <span>
                      💼
                    </span>

                    <p>
                      {job.jobType ||
                        "Job type not specified"}
                    </p>

                  </div>


                  <div className="careerai-myjobs-detail">

                    <span>
                      🎓
                    </span>

                    <p>
                      {job.experienceLevel ||
                        "Experience not specified"}
                    </p>

                  </div>


                </div>



                {/* SALARY */}

                {(job.salaryMin ||
                  job.salaryMax) && (

                  <div className="careerai-myjobs-salary">

                    💰

                    <span>

                      {job.salaryMin
                        ? `£${job.salaryMin}`
                        : ""}

                      {job.salaryMin &&
                        job.salaryMax
                        ? " - "
                        : ""}

                      {job.salaryMax
                        ? `£${job.salaryMax}`
                        : ""}

                    </span>

                  </div>

                )}



                {/* SKILLS */}

                {job.skills && (

                  <div className="careerai-myjobs-skills">

                    {job.skills
                      .split(",")
                      .map(
                        (skill, index) => (

                          <span
                            key={index}
                          >
                            {skill.trim()}
                          </span>

                        )
                      )}

                  </div>

                )}



                {/* DESCRIPTION */}

                {job.description && (

                  <p className="careerai-myjobs-description">

                    {job.description.length > 150
                      ? `${job.description.substring(
                          0,
                          150
                        )}...`
                      : job.description}

                  </p>

                )}



                {/* ACTIONS */}

                <div className="careerai-myjobs-actions">


                  <button
                    className="careerai-myjobs-view-button"
                    onClick={() =>
                      navigate(
                        `/recruiter/jobs/${job.id}`
                      )
                    }
                  >
                    View
                  </button>


                  <button
                    className="careerai-myjobs-edit-button"
                    onClick={() =>
                      navigate(
                        `/recruiter/jobs/edit/${job.id}`
                      )
                    }
                  >
                    Edit
                  </button>


                  <button
                    className="careerai-myjobs-delete-button"
                    onClick={() =>
                      handleDeleteJob(job.id)
                    }
                    disabled={deleting}
                  >
                    {deleting
                      ? "Deleting..."
                      : "Delete"}
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

export default MyJobs;