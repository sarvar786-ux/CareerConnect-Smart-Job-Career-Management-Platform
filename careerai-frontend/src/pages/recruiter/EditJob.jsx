import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "./EditJob.css";

function EditJob() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    salaryMin: "",
    salaryMax: "",
    skills: "",
    companyId: ""
  });


  // =====================================================
  // FETCH JOB DETAILS
  // =====================================================

  useEffect(() => {

    fetchJob();

  }, [id]);


  const fetchJob = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get(
        `/jobs/${id}`
      );

      console.log(
        "Edit Job Response:",
        response.data
      );

      const job = response.data;

      setFormData({
        title: job.title || "",
        description: job.description || "",
        location: job.location || "",
        jobType: job.jobType || "",
        experienceLevel: job.experienceLevel || "",
        salaryMin: job.salaryMin ?? "",
        salaryMax: job.salaryMax ?? "",
        skills: job.skills || "",
        companyId: job.companyId || ""
      });

    } catch (err) {

      console.error(
        "Fetch Job Error:",
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
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  };


  // =====================================================
  // UPDATE JOB
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);
      setError("");
      setSuccess("");

      const requestData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        jobType: formData.jobType,
        experienceLevel: formData.experienceLevel,
        salaryMin:
          formData.salaryMin === ""
            ? null
            : Number(formData.salaryMin),
        salaryMax:
          formData.salaryMax === ""
            ? null
            : Number(formData.salaryMax),
        skills: formData.skills,
        companyId: Number(formData.companyId)
      };

      console.log(
        "Updating Job:",
        requestData
      );

      const response = await api.put(
        `/jobs/${id}`,
        requestData
      );

      console.log(
        "Job Updated:",
        response.data
      );

      setSuccess(
        "Job updated successfully!"
      );

      // Redirect after short delay
      setTimeout(() => {

        navigate("/recruiter/jobs");

      }, 1000);

    } catch (err) {

      console.error(
        "Update Job Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to update job"
      );

    } finally {

      setSaving(false);

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

      <div className="careerai-editjob-loading">

        <div className="careerai-editjob-spinner"></div>

        <p>
          Loading job details...
        </p>

      </div>

    );

  }


  // =====================================================
  // PAGE
  // =====================================================

  return (

    <div className="careerai-editjob-page">


      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <aside className="careerai-editjob-sidebar">

        <div className="careerai-editjob-logo">
          Career<span>AI</span>
        </div>


        <div className="careerai-editjob-menu">


          <button
            className="careerai-editjob-menu-item"
            onClick={() =>
              navigate("/recruiter/dashboard")
            }
          >
            <span>⌂</span>
            Dashboard
          </button>


          <button
            className="careerai-editjob-menu-item"
            onClick={() =>
              navigate("/recruiter/company")
            }
          >
            <span>🏢</span>
            My Company
          </button>


          <button
            className="careerai-editjob-menu-item active"
            onClick={() =>
              navigate("/recruiter/jobs")
            }
          >
            <span>💼</span>
            Manage Jobs
          </button>


          <button
            className="careerai-editjob-menu-item"
            onClick={() =>
              navigate("/recruiter/applications")
            }
          >
            <span>📋</span>
            Applications
          </button>


        </div>


        <div className="careerai-editjob-sidebar-bottom">

          <button
            className="careerai-editjob-menu-item logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <main className="careerai-editjob-main">


        {/* HEADER */}

        <header className="careerai-editjob-header">

          <div>

            <button
              className="careerai-editjob-back-button"
              onClick={() =>
                navigate("/recruiter/jobs")
              }
            >
              ← Back to Jobs
            </button>

            <h1>
              Edit Job
            </h1>

            <p>
              Update your job posting details.
            </p>

          </div>

        </header>


        {/* ERROR */}

        {error && (

          <div className="careerai-editjob-error">
            ⚠ {error}
          </div>

        )}


        {/* SUCCESS */}

        {success && (

          <div className="careerai-editjob-success">
            ✓ {success}
          </div>

        )}


        {/* FORM CARD */}

        <div className="careerai-editjob-card">


          <div className="careerai-editjob-card-header">

            <div className="careerai-editjob-icon">
              ✏
            </div>

            <div>

              <h2>
                Update Job Information
              </h2>

              <p>
                Make changes to your job posting below.
              </p>

            </div>

          </div>


          <form
            onSubmit={handleSubmit}
            className="careerai-editjob-form"
          >


            {/* JOB TITLE */}

            <div className="careerai-editjob-form-group">

              <label>
                Job Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Full Stack Developer"
                value={formData.title}
                onChange={handleChange}
                required
              />

            </div>


            {/* DESCRIPTION */}

            <div className="careerai-editjob-form-group">

              <label>
                Job Description
              </label>

              <textarea
                name="description"
                placeholder="Describe the job responsibilities..."
                value={formData.description}
                onChange={handleChange}
                rows="7"
                required
              />

            </div>


            {/* LOCATION */}

            <div className="careerai-editjob-form-group">

              <label>
                Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="e.g. Hyderabad, India"
                value={formData.location}
                onChange={handleChange}
                required
              />

            </div>


            {/* TWO COLUMN */}

            <div className="careerai-editjob-form-row">


              {/* JOB TYPE */}

              <div className="careerai-editjob-form-group">

                <label>
                  Job Type
                </label>

                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Job Type
                  </option>

                  <option value="FULL_TIME">
                    Full Time
                  </option>

                  <option value="PART_TIME">
                    Part Time
                  </option>

                  <option value="INTERNSHIP">
                    Internship
                  </option>

                  <option value="CONTRACT">
                    Contract
                  </option>

                  <option value="REMOTE">
                    Remote
                  </option>

                </select>

              </div>


              {/* EXPERIENCE */}

              <div className="careerai-editjob-form-group">

                <label>
                  Experience Level
                </label>

                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Experience
                  </option>

                  <option value="FRESHER">
                    Fresher
                  </option>

                  <option value="ENTRY_LEVEL">
                    Entry Level
                  </option>

                  <option value="MID_LEVEL">
                    Mid Level
                  </option>

                  <option value="SENIOR_LEVEL">
                    Senior Level
                  </option>

                </select>

              </div>

            </div>


            {/* SALARY */}

            <div className="careerai-editjob-form-row">


              <div className="careerai-editjob-form-group">

                <label>
                  Minimum Salary
                </label>

                <input
                  type="number"
                  name="salaryMin"
                  placeholder="e.g. 300000"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  min="0"
                />

              </div>


              <div className="careerai-editjob-form-group">

                <label>
                  Maximum Salary
                </label>

                <input
                  type="number"
                  name="salaryMax"
                  placeholder="e.g. 600000"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  min="0"
                />

              </div>

            </div>


            {/* SKILLS */}

            <div className="careerai-editjob-form-group">

              <label>
                Required Skills
              </label>

              <input
                type="text"
                name="skills"
                placeholder="Java, Spring Boot, React, MySQL"
                value={formData.skills}
                onChange={handleChange}
                required
              />

              <small>
                Separate skills using commas.
              </small>

            </div>


            {/* ACTIONS */}

            <div className="careerai-editjob-actions">


              <button
                type="button"
                className="careerai-editjob-cancel-button"
                onClick={() =>
                  navigate("/recruiter/jobs")
                }
                disabled={saving}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="careerai-editjob-save-button"
                disabled={saving}
              >

                {saving
                  ? "Saving Changes..."
                  : "Save Changes →"}

              </button>


            </div>


          </form>

        </div>

      </main>

    </div>

  );

}

export default EditJob;