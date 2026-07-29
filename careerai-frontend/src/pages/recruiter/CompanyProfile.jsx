import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./CompanyProfile.css";

function CompanyProfile() {

  const navigate = useNavigate();

  // =========================================
  // STATE
  // =========================================

  const [company, setCompany] = useState(null);

  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    website: "",
    location: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isEditing, setIsEditing] = useState(false);


  // =========================================
  // FETCH COMPANY
  // =========================================

  useEffect(() => {

    fetchCompany();

  }, []);


  const fetchCompany = async () => {

    try {

      setLoading(true);
      setError("");

      /*
       * We get the logged-in user from localStorage.
       * Make sure your login stores the user object.
       */

      const storedUser =
        JSON.parse(
          localStorage.getItem("user")
        );

      if (!storedUser) {

        setError(
          "User information not found. Please login again."
        );

        return;

      }

      const recruiterId = storedUser.id;

      // Get all companies
      const response =
        await api.get("/companies");

      // Find company belonging to logged-in recruiter
      const recruiterCompany =
        response.data.find(
          (item) =>
            item.recruiterId === recruiterId
        );

      if (recruiterCompany) {

        setCompany(recruiterCompany);

        setFormData({

          companyName:
            recruiterCompany.companyName || "",

          description:
            recruiterCompany.description || "",

          website:
            recruiterCompany.website || "",

          location:
            recruiterCompany.location || ""

        });

      } else {

        setCompany(null);

      }

    } catch (err) {

      console.error(
        "Company Fetch Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to load company profile."
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================================
  // HANDLE INPUT
  // =========================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData({

      ...formData,

      [name]: value

    });

  };


  // =========================================
  // CREATE COMPANY
  // =========================================

  const handleCreateCompany = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      setError("");
      setSuccess("");

      const response =
        await api.post(
          "/companies",
          formData
        );

      setCompany(
        response.data
      );

      setSuccess(
        "Company profile created successfully!"
      );

    } catch (err) {

      console.error(
        "Create Company Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to create company profile."
      );

    } finally {

      setSaving(false);

    }

  };


  // =========================================
  // UPDATE COMPANY
  // =========================================

  const handleUpdateCompany = async (e) => {

    e.preventDefault();

    if (!company) {

      return;

    }

    try {

      setSaving(true);

      setError("");
      setSuccess("");

      const response =
        await api.put(
          `/companies/${company.id}`,
          formData
        );

      setCompany(
        response.data
      );

      setIsEditing(false);

      setSuccess(
        "Company profile updated successfully!"
      );

    } catch (err) {

      console.error(
        "Update Company Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to update company profile."
      );

    } finally {

      setSaving(false);

    }

  };


  // =========================================
  // DELETE COMPANY
  // =========================================

  const handleDeleteCompany = async () => {

    if (!company) {

      return;

    }

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete your company profile?"
      );

    if (!confirmDelete) {

      return;

    }

    try {

      setError("");
      setSuccess("");

      await api.delete(
        `/companies/${company.id}`
      );

      setCompany(null);

      setFormData({

        companyName: "",
        description: "",
        website: "",
        location: ""

      });

      setSuccess(
        "Company profile deleted successfully."
      );

    } catch (err) {

      console.error(
        "Delete Company Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to delete company profile."
      );

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

      <div className="company-loading">

        <div className="company-spinner"></div>

        <p>
          Loading company profile...
        </p>

      </div>

    );

  }


  // =========================================
  // MAIN UI
  // =========================================

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
            className="recruiter-menu-item"
            onClick={() =>
              navigate("/recruiter/dashboard")
            }
          >

            <span>⌂</span>

            Dashboard

          </button>


          {/* COMPANY */}

          <button
            className="recruiter-menu-item active"
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


          {/* POST JOB */}

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


        {/* LOGOUT */}

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

      <main className="company-main">

        {/* HEADER */}

        <header className="company-header">

          <div>

            <h1>
              Company Profile
            </h1>

            <p>
              Create and manage your company information.
            </p>

          </div>

        </header>


        {/* ================================= */}
        {/* MESSAGES */}
        {/* ================================= */}

        {error && (

          <div className="company-message error">

            ⚠ {error}

          </div>

        )}


        {success && (

          <div className="company-message success">

            ✓ {success}

          </div>

        )}


        {/* ================================= */}
        {/* NO COMPANY */}
        {/* ================================= */}

        {!company && (

          <section className="company-card">

            <div className="company-card-header">

              <div className="company-icon">
                🏢
              </div>

              <div>

                <h2>
                  Create Your Company Profile
                </h2>

                <p>
                  Add your company details so candidates
                  can learn more about your organization.
                </p>

              </div>

            </div>


            <form
              onSubmit={handleCreateCompany}
              className="company-form"
            >

              {/* COMPANY NAME */}

              <div className="form-group">

                <label>
                  Company Name
                </label>

                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* LOCATION */}

              <div className="form-group">

                <label>
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Hyderabad, India"
                  value={formData.location}
                  onChange={handleChange}
                />

              </div>


              {/* WEBSITE */}

              <div className="form-group">

                <label>
                  Website
                </label>

                <input
                  type="url"
                  name="website"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={handleChange}
                />

              </div>


              {/* DESCRIPTION */}

              <div className="form-group full-width">

                <label>
                  Company Description
                </label>

                <textarea
                  name="description"
                  placeholder="Tell candidates about your company..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                ></textarea>

              </div>


              {/* BUTTON */}

              <div className="form-actions">

                <button
                  type="submit"
                  className="company-primary-button"
                  disabled={saving}
                >

                  {saving
                    ? "Creating..."
                    : "Create Company Profile →"}

                </button>

              </div>

            </form>

          </section>

        )}


        {/* ================================= */}
        {/* COMPANY EXISTS */}
        {/* ================================= */}

        {company && !isEditing && (

          <section className="company-card">

            {/* COMPANY TOP */}

            <div className="company-profile-top">

              <div className="company-large-icon">
                {company.companyName
                  ?.charAt(0)
                  ?.toUpperCase() || "C"}
              </div>

              <div className="company-profile-title">

                <h2>
                  {company.companyName}
                </h2>

                <p>
                  {company.location ||
                    "Location not specified"}
                </p>

              </div>

            </div>


            {/* COMPANY DETAILS */}

            <div className="company-details-grid">

              <div className="company-detail-item">

                <span>
                  📍
                </span>

                <div>

                  <small>
                    Location
                  </small>

                  <strong>
                    {company.location ||
                      "Not specified"}
                  </strong>

                </div>

              </div>


              <div className="company-detail-item">

                <span>
                  🌐
                </span>

                <div>

                  <small>
                    Website
                  </small>

                  {company.website ? (

                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit Website
                    </a>

                  ) : (

                    <strong>
                      Not specified
                    </strong>

                  )}

                </div>

              </div>


              <div className="company-detail-item">

                <span>
                  👤
                </span>

                <div>

                  <small>
                    Recruiter
                  </small>

                  <strong>
                    {company.recruiterName ||
                      "Recruiter"}
                  </strong>

                </div>

              </div>

            </div>


            {/* DESCRIPTION */}

            <div className="company-description">

              <h3>
                About the Company
              </h3>

              <p>
                {company.description ||
                  "No company description available."}
              </p>

            </div>


            {/* ACTIONS */}

            <div className="company-actions">

              <button
                className="company-edit-button"
                onClick={() =>
                  setIsEditing(true)
                }
              >
                ✏ Edit Profile
              </button>


              <button
                className="company-delete-button"
                onClick={handleDeleteCompany}
              >
                🗑 Delete Company
              </button>

            </div>

          </section>

        )}


        {/* ================================= */}
        {/* EDIT COMPANY */}
        {/* ================================= */}

        {company && isEditing && (

          <section className="company-card">

            <div className="company-card-header">

              <div className="company-icon">
                ✏
              </div>

              <div>

                <h2>
                  Edit Company Profile
                </h2>

                <p>
                  Update your company information.
                </p>

              </div>

            </div>


            <form
              onSubmit={handleUpdateCompany}
              className="company-form"
            >

              {/* COMPANY NAME */}

              <div className="form-group">

                <label>
                  Company Name
                </label>

                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* LOCATION */}

              <div className="form-group">

                <label>
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />

              </div>


              {/* WEBSITE */}

              <div className="form-group">

                <label>
                  Website
                </label>

                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                />

              </div>


              {/* DESCRIPTION */}

              <div className="form-group full-width">

                <label>
                  Company Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                ></textarea>

              </div>


              {/* ACTIONS */}

              <div className="form-actions">

                <button
                  type="button"
                  className="company-cancel-button"
                  onClick={() =>
                    setIsEditing(false)
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="company-primary-button"
                  disabled={saving}
                >

                  {saving
                    ? "Saving..."
                    : "Save Changes →"}

                </button>

              </div>

            </form>

          </section>

        )}

      </main>

    </div>

  );

}

export default CompanyProfile;