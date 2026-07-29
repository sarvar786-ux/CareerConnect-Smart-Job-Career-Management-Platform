import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "./JobDetails.css";

function JobDetails() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [coverLetter, setCoverLetter] = useState("");


  // =====================================================
  // FETCH JOB
  // =====================================================

  useEffect(() => {

    fetchJobDetails();

  }, [id]);


  const fetchJobDetails = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get(
        `/jobs/${id}`
      );

      console.log(
        "Job Details:",
        response.data
      );

      setJob(response.data);

    } catch (err) {

      console.error(
        "Job Details Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to load job details"
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // APPLY FOR JOB
  // =====================================================

  const handleApply = async () => {

    try {

      setApplying(true);

      setError("");
      setSuccess("");

      const requestData = {
        jobId: Number(id),
        coverLetter: coverLetter
      };

      console.log(
        "Applying for Job:",
        requestData
      );

      const response = await api.post(
        "/applications",
        requestData
      );

      console.log(
        "Application Created:",
        response.data
      );

      setSuccess(
        "Application submitted successfully!"
      );

      setCoverLetter("");

    } catch (err) {

      console.error(
        "Apply Job Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to apply for this job"
      );

    } finally {

      setApplying(false);

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

      <div className="careerai-jobdetails-loading">

        <div className="careerai-jobdetails-spinner"></div>

        <p>
          Loading job details...
        </p>

      </div>

    );

  }


  // =====================================================
  // JOB NOT FOUND
  // =====================================================

  if (!job) {

    return (

      <div className="careerai-jobdetails-notfound">

        <div className="careerai-jobdetails-notfound-icon">
          🔍
        </div>

        <h2>
          Job Not Found
        </h2>

        <p>
          The job you're looking for does not exist
          or has been removed.
        </p>

        <button
          onClick={() =>
            navigate(-1)
          }
        >
          ← Go Back
        </button>

      </div>

    );

  }


  // =====================================================
  // PAGE
  // =====================================================

  return (

    <div className="careerai-jobdetails-page">


      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <aside className="careerai-jobdetails-sidebar">

        <div className="careerai-jobdetails-logo">
          Career<span>AI</span>
        </div>


        <div className="careerai-jobdetails-menu">


          <button
            className="careerai-jobdetails-menu-item"
            onClick={() =>
              navigate("/job-seeker/dashboard")
            }
          >
            <span>⌂</span>
            Dashboard
          </button>


          <button
            className="careerai-jobdetails-menu-item active"
            onClick={() =>
              navigate("/job-seeker/jobs")
            }
          >
            <span>💼</span>
            Find Jobs
          </button>


          <button
            className="careerai-jobdetails-menu-item"
            onClick={() =>
              navigate("/job-seeker/applications")
            }
          >
            <span>📋</span>
            My Applications
          </button>


        </div>


        <div className="careerai-jobdetails-sidebar-bottom">

          <button
            className="careerai-jobdetails-menu-item logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="careerai-jobdetails-main">


        {/* BACK BUTTON */}

        <button
          className="careerai-jobdetails-back"
          onClick={() =>
            navigate(-1)
          }
        >
          ← Back
        </button>


        {/* ERROR */}

        {error && (

          <div className="careerai-jobdetails-error">
            ⚠ {error}
          </div>

        )}


        {/* SUCCESS */}

        {success && (

          <div className="careerai-jobdetails-success">
            ✓ {success}
          </div>

        )}


        {/* ================================================= */}
        {/* JOB HEADER */}
        {/* ================================================= */}

        <section className="careerai-jobdetails-header-card">


          <div className="careerai-jobdetails-company-icon">

            {job.companyName
              ?.charAt(0)
              .toUpperCase() || "C"}

          </div>


          <div className="careerai-jobdetails-header-content">

            <h1>
              {job.title}
            </h1>

            <h3>
              {job.companyName ||
                "Company Not Specified"}
            </h3>


            <div className="careerai-jobdetails-meta">

              <span>
                📍 {job.location ||
                  "Location not specified"}
              </span>

              <span>
                💼 {job.jobType ||
                  "Job Type not specified"}
              </span>

              <span>
                🎓 {job.experienceLevel ||
                  "Experience not specified"}
              </span>

            </div>

          </div>


        </section>


        {/* ================================================= */}
        {/* CONTENT GRID */}
        {/* ================================================= */}

        <div className="careerai-jobdetails-grid">


          {/* ================================================= */}
          {/* LEFT CONTENT */}
          {/* ================================================= */}

          <div className="careerai-jobdetails-content">


            {/* DESCRIPTION */}

            <section className="careerai-jobdetails-section">

              <h2>
                Job Description
              </h2>

              <p>
                {job.description ||
                  "No job description available."}
              </p>

            </section>


            {/* SKILLS */}

            <section className="careerai-jobdetails-section">

              <h2>
                Required Skills
              </h2>


              <div className="careerai-jobdetails-skills">

                {job.skills
                  ? job.skills
                      .split(",")
                      .map(
                        (skill, index) => (

                          <span
                            key={index}
                          >
                            {skill.trim()}
                          </span>

                        )
                      )
                  : (

                    <span>
                      No specific skills listed
                    </span>

                  )}

              </div>

            </section>


            {/* COMPANY */}

            <section className="careerai-jobdetails-section">

              <h2>
                About the Company
              </h2>

              <p>
                {job.companyName ||
                  "Company information unavailable."}
              </p>

            </section>


          </div>


          {/* ================================================= */}
          {/* RIGHT SIDEBAR */}
          {/* ================================================= */}

          <aside className="careerai-jobdetails-right">


            {/* JOB SUMMARY */}

            <div className="careerai-jobdetails-summary-card">

              <h2>
                Job Summary
              </h2>


              <div className="careerai-jobdetails-summary-item">

                <span>
                  💼 Job Type
                </span>

                <strong>
                  {job.jobType || "Not specified"}
                </strong>

              </div>


              <div className="careerai-jobdetails-summary-item">

                <span>
                  📍 Location
                </span>

                <strong>
                  {job.location || "Not specified"}
                </strong>

              </div>


              <div className="careerai-jobdetails-summary-item">

                <span>
                  🎓 Experience
                </span>

                <strong>
                  {job.experienceLevel ||
                    "Not specified"}
                </strong>

              </div>


              <div className="careerai-jobdetails-summary-item">

                <span>
                  💰 Salary
                </span>

                <strong>

                  {job.salaryMin ||
                  job.salaryMax

                    ? `₹${job.salaryMin || 0} - ₹${job.salaryMax || 0}`

                    : "Not specified"}

                </strong>

              </div>


            </div>


            {/* APPLY CARD */}

            <div className="careerai-jobdetails-apply-card">

              <h2>
                Interested in this job?
              </h2>

              <p>
                Submit your application and
                take the next step in your career.
              </p>


              <textarea
                placeholder="Write a cover letter (optional)..."
                value={coverLetter}
                onChange={(e) =>
                  setCoverLetter(e.target.value)
                }
                rows="6"
              />


              <button
                className="careerai-jobdetails-apply-button"
                onClick={handleApply}
                disabled={applying}
              >

                {applying
                  ? "Submitting..."
                  : "Apply Now →"}

              </button>

            </div>


          </aside>


        </div>


      </main>

    </div>

  );

}

export default JobDetails;