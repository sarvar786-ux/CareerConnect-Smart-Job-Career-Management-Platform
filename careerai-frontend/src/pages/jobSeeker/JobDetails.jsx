import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "./JobDetails.css";

function JobDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================
  // FETCH JOB DETAILS
  // =========================================

  useEffect(() => {

    const fetchJob = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await api.get(`/jobs/${id}`);

        console.log("Job Details:", response.data);

        setJob(response.data);

      } catch (err) {

        console.error("Job Details Error:", err);

        setError(
          err.response?.data?.message ||
          "Unable to load job details"
        );

      } finally {

        setLoading(false);

      }
    };

    fetchJob();

  }, [id]);


  // =========================================
  // APPLY FOR JOB
  // =========================================

  const handleApply = async (e) => {

    e.preventDefault();

    if (!coverLetter.trim()) {

      setError("Please enter a cover letter.");

      return;

    }

    try {

      setApplying(true);
      setError("");
      setSuccess("");

      const response = await api.post(
        "/applications",
        {
          jobId: Number(id),
          coverLetter: coverLetter
        }
      );

      console.log(
        "Application Response:",
        response.data
      );

      setSuccess(
        "Application submitted successfully!"
      );

      setCoverLetter("");

    } catch (err) {

      console.error(
        "Application Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to submit application"
      );

    } finally {

      setApplying(false);

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

      <div className="job-details-loading">

        <div className="jobs-spinner"></div>

        <p>
          Loading job details...
        </p>

      </div>

    );

  }


  // =========================================
  // ERROR
  // =========================================

  if (error && !job) {

    return (

      <div className="job-details-error">

        <h2>
          Unable to load job
        </h2>

        <p>
          {error}
        </p>

        <button
          onClick={() =>
            navigate("/job-seeker/jobs")
          }
        >
          ← Back to Jobs
        </button>

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
            className="jobs-menu-item active"
            onClick={() =>
              navigate("/job-seeker/jobs")
            }
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

      <main className="job-details-main">

        <button
          className="back-button"
          onClick={() =>
            navigate("/job-seeker/jobs")
          }
        >
          ← Back to Jobs
        </button>


        {/* ================================= */}
        {/* JOB INFORMATION */}
        {/* ================================= */}

        <div className="job-details-card">

          <div className="job-details-header">

            <div className="company-logo large">

              {job?.companyName
                ? job.companyName
                    .charAt(0)
                    .toUpperCase()
                : "C"}

            </div>


            <div>

              <h1>
                {job?.title}
              </h1>

              <p className="company-name">
                {job?.companyName ||
                  "Company"}
              </p>

            </div>

          </div>


          <div className="job-info-grid">

            <div className="job-info-item">

              <span>📍</span>

              <div>
                <small>Location</small>
                <strong>
                  {job?.location ||
                    "Remote"}
                </strong>
              </div>

            </div>


            <div className="job-info-item">

              <span>💼</span>

              <div>
                <small>Job Type</small>
                <strong>
                  {job?.jobType ||
                    "Full Time"}
                </strong>
              </div>

            </div>


            <div className="job-info-item">

              <span>🎯</span>

              <div>
                <small>Experience</small>
                <strong>
                  {job?.experienceLevel ||
                    "Not specified"}
                </strong>
              </div>

            </div>


            <div className="job-info-item">

              <span>💰</span>

              <div>
                <small>Salary</small>

                <strong>

                  {job?.salaryMin ||
                  job?.salaryMax
                    ? `£${job.salaryMin || 0} - £${job.salaryMax || 0}`
                    : "Not specified"}

                </strong>

              </div>

            </div>

          </div>


          {/* ================================= */}
          {/* DESCRIPTION */}
          {/* ================================= */}

          <div className="job-section">

            <h2>
              Job Description
            </h2>

            <p>
              {job?.description ||
                "No description available."}
            </p>

          </div>


          {/* ================================= */}
          {/* SKILLS */}
          {/* ================================= */}

          {job?.skills && (

            <div className="job-section">

              <h2>
                Required Skills
              </h2>

              <div className="skills-list">

                {job.skills
                  .split(",")
                  .map((skill, index) => (

                    <span
                      className="skill-tag"
                      key={index}
                    >
                      {skill.trim()}
                    </span>

                  ))}

              </div>

            </div>

          )}

        </div>


        {/* ================================= */}
        {/* APPLY SECTION */}
        {/* ================================= */}

        <div className="apply-card">

          <h2>
            Apply for this position
          </h2>

          <p>
            Tell the recruiter why you are a
            good fit for this job.
          </p>


          {error && (

            <div className="application-error">
              ⚠ {error}
            </div>

          )}


          {success && (

            <div className="application-success">
              ✓ {success}
            </div>

          )}


          <form onSubmit={handleApply}>

            <label>
              Cover Letter
            </label>

            <textarea
              placeholder="Write your cover letter here..."
              value={coverLetter}
              onChange={(e) =>
                setCoverLetter(
                  e.target.value
                )
              }
              rows="7"
              required
            ></textarea>


            <button
              type="submit"
              className="apply-submit-button"
              disabled={applying}
            >

              {applying
                ? "Submitting Application..."
                : "Submit Application →"}

            </button>

          </form>

        </div>

      </main>

    </div>

  );

}

export default JobDetails;