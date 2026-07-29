import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./CreateJob.css";

function CreateJob() {

  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  // =========================================
  // HANDLE INPUT CHANGE
  // =========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  };


  // =========================================
  // HANDLE LOGOUT
  // =========================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };


  // =========================================
  // CREATE JOB
  // =========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    // Basic Validation
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.location.trim() ||
      !formData.jobType ||
      !formData.experienceLevel ||
      !formData.companyId
    ) {

      setError(
        "Please fill all required fields."
      );

      return;

    }


    try {

      setLoading(true);


      const requestData = {

        title: formData.title,

        description: formData.description,

        location: formData.location,

        jobType: formData.jobType,

        experienceLevel:
          formData.experienceLevel,

        salaryMin:
          formData.salaryMin
            ? Number(formData.salaryMin)
            : null,

        salaryMax:
          formData.salaryMax
            ? Number(formData.salaryMax)
            : null,

        skills: formData.skills,

        companyId:
          Number(formData.companyId)

      };


      console.log(
        "Creating Job:",
        requestData
      );


      const response = await api.post(
        "/jobs",
        requestData
      );


      console.log(
        "Job Created:",
        response.data
      );


      setSuccess(
        "Job posted successfully!"
      );


      // Clear form

      setFormData({

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


      // Navigate after short delay

      setTimeout(() => {

        navigate("/recruiter/jobs");

      }, 1200);


    } catch (err) {

      console.error(
        "Create Job Error:",
        err
      );


      setError(

        err.response?.data?.message ||

        "Unable to create job. Please try again."

      );


    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="cj-page">


      {/* ================================= */}
      {/* SIDEBAR */}
      {/* ================================= */}

      <aside className="cj-sidebar">


        {/* LOGO */}

        <div className="cj-logo">

          Career<span>AI</span>

        </div>


        {/* MENU */}

        <div className="cj-menu">


          {/* DASHBOARD */}

          <button

            className="cj-menu-item"

            onClick={() =>
              navigate("/recruiter/dashboard")
            }

          >

            <span>⌂</span>

            Dashboard

          </button>


          {/* MY JOBS */}

          <button

            className="cj-menu-item"

            onClick={() =>
              navigate("/recruiter/jobs")
            }

          >

            <span>💼</span>

            My Jobs

          </button>


          {/* POST JOB */}

          <button

            className="cj-menu-item cj-active"

          >

            <span>➕</span>

            Post a Job

          </button>


          {/* APPLICATIONS */}

          <button

            className="cj-menu-item"

            onClick={() =>
              navigate("/recruiter/applications")
            }

          >

            <span>📋</span>

            Applications

          </button>


        </div>


        {/* SIDEBAR BOTTOM */}

        <div className="cj-sidebar-bottom">


          <button

            className="cj-menu-item cj-logout"

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

      <main className="cj-main">


        {/* BACK BUTTON */}

        <button

          className="cj-back-button"

          onClick={() =>
            navigate("/recruiter/dashboard")
          }

        >

          ← Back to Dashboard

        </button>


        {/* HEADER */}

        <header className="cj-header">

          <h1>
            Post a New Job
          </h1>

          <p>
            Create a job opportunity and
            find the right talent for your team.
          </p>

        </header>


        {/* ================================= */}
        {/* FORM CARD */}
        {/* ================================= */}

        <div className="cj-card">


          <form

            className="cj-form"

            onSubmit={handleSubmit}

          >


            {/* ERROR */}

            {error && (

              <div className="cj-error">

                ⚠ {error}

              </div>

            )}


            {/* SUCCESS */}

            {success && (

              <div className="cj-success">

                ✓ {success}

              </div>

            )}


            {/* ================================= */}
            {/* JOB TITLE */}
            {/* ================================= */}

            <div className="cj-form-group cj-full-width">

              <label htmlFor="cj-title">

                Job Title <span>*</span>

              </label>

              <input

                id="cj-title"

                type="text"

                name="title"

                placeholder="e.g. Senior Java Developer"

                value={formData.title}

                onChange={handleChange}

              />

            </div>


            {/* ================================= */}
            {/* DESCRIPTION */}
            {/* ================================= */}

            <div className="cj-form-group cj-full-width">

              <label htmlFor="cj-description">

                Job Description <span>*</span>

              </label>

              <textarea

                id="cj-description"

                name="description"

                placeholder="Describe the job role, responsibilities and requirements..."

                value={formData.description}

                onChange={handleChange}

                rows="7"

              ></textarea>

            </div>


            {/* ================================= */}
            {/* LOCATION + JOB TYPE */}
            {/* ================================= */}

            <div className="cj-form-row">


              {/* LOCATION */}

              <div className="cj-form-group">

                <label htmlFor="cj-location">

                  Location <span>*</span>

                </label>

                <input

                  id="cj-location"

                  type="text"

                  name="location"

                  placeholder="e.g. Hyderabad"

                  value={formData.location}

                  onChange={handleChange}

                />

              </div>


              {/* JOB TYPE */}

              <div className="cj-form-group">

                <label htmlFor="cj-jobType">

                  Job Type <span>*</span>

                </label>

                <select

                  id="cj-jobType"

                  name="jobType"

                  value={formData.jobType}

                  onChange={handleChange}

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

                  <option value="CONTRACT">

                    Contract

                  </option>

                  <option value="INTERNSHIP">

                    Internship

                  </option>

                  <option value="REMOTE">

                    Remote

                  </option>

                </select>

              </div>


            </div>


            {/* ================================= */}
            {/* EXPERIENCE + COMPANY */}
            {/* ================================= */}

            <div className="cj-form-row">


              {/* EXPERIENCE */}

              <div className="cj-form-group">

                <label htmlFor="cj-experience">

                  Experience Level <span>*</span>

                </label>

                <select

                  id="cj-experience"

                  name="experienceLevel"

                  value={
                    formData.experienceLevel
                  }

                  onChange={handleChange}

                >

                  <option value="">

                    Select Experience

                  </option>

                  <option value="FRESHER">

                    Fresher

                  </option>

                  <option value="0-2 Years">

                    0 - 2 Years

                  </option>

                  <option value="2-5 Years">

                    2 - 5 Years

                  </option>

                  <option value="5-8 Years">

                    5 - 8 Years

                  </option>

                  <option value="8+ Years">

                    8+ Years

                  </option>

                </select>

              </div>


              {/* COMPANY ID */}

              <div className="cj-form-group">

                <label htmlFor="cj-companyId">

                  Company ID <span>*</span>

                </label>

                <input

                  id="cj-companyId"

                  type="number"

                  name="companyId"

                  placeholder="Enter your company ID"

                  value={formData.companyId}

                  onChange={handleChange}

                />

              </div>


            </div>


            {/* ================================= */}
            {/* SALARY */}
            {/* ================================= */}

            <div className="cj-form-row">


              {/* MINIMUM SALARY */}

              <div className="cj-form-group">

                <label htmlFor="cj-salaryMin">

                  Minimum Salary

                </label>

                <div className="cj-salary-wrapper">

                  <span>£</span>

                  <input

                    id="cj-salaryMin"

                    type="number"

                    name="salaryMin"

                    placeholder="e.g. 30000"

                    value={formData.salaryMin}

                    onChange={handleChange}

                  />

                </div>

              </div>


              {/* MAXIMUM SALARY */}

              <div className="cj-form-group">

                <label htmlFor="cj-salaryMax">

                  Maximum Salary

                </label>

                <div className="cj-salary-wrapper">

                  <span>£</span>

                  <input

                    id="cj-salaryMax"

                    type="number"

                    name="salaryMax"

                    placeholder="e.g. 60000"

                    value={formData.salaryMax}

                    onChange={handleChange}

                  />

                </div>

              </div>


            </div>


            {/* ================================= */}
            {/* SKILLS */}
            {/* ================================= */}

            <div className="cj-form-group cj-full-width">

              <label htmlFor="cj-skills">

                Required Skills

              </label>

              <input

                id="cj-skills"

                type="text"

                name="skills"

                placeholder="e.g. Java, Spring Boot, MySQL, React"

                value={formData.skills}

                onChange={handleChange}

              />

              <small>

                Separate multiple skills using commas.

              </small>

            </div>


            {/* ================================= */}
            {/* ACTION BUTTONS */}
            {/* ================================= */}

            <div className="cj-actions">


              <button

                type="button"

                className="cj-cancel"

                onClick={() =>
                  navigate("/recruiter/jobs")
                }

              >

                Cancel

              </button>


              <button

                type="submit"

                className="cj-submit"

                disabled={loading}

              >

                {loading ? (

                  <span className="cj-loading">

                    <span className="cj-spinner"></span>

                    Posting Job...

                  </span>

                ) : (

                  "Post Job →"

                )}

              </button>


            </div>


          </form>


        </div>


      </main>


    </div>

  );

}

export default CreateJob;