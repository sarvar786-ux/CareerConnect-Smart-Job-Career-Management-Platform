import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./MyCompany.css";

function MyCompany() {

  const navigate = useNavigate();

  const [company, setCompany] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    website: "",
    location: ""
  });

  const [isEditing, setIsEditing] = useState(false);


  // =========================================
  // FETCH MY COMPANY
  // =========================================

  useEffect(() => {

    fetchMyCompany();

  }, []);


  const fetchMyCompany = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get("/companies/my");

      console.log(
        "My Companies Response:",
        response.data
      );


      // =========================================
      // BACKEND RETURNS A LIST OF COMPANIES
      // =========================================

      const companies = response.data;


      // =========================================
      // CHECK IF COMPANY EXISTS
      // =========================================

      if (
        companies &&
        Array.isArray(companies) &&
        companies.length > 0
      ) {

        // Currently using first company
        const myCompany = companies[0];

        console.log(
          "Selected Company:",
          myCompany
        );


        // Store company
        setCompany(myCompany);


        // Fill form data
        setFormData({

          companyName:
            myCompany.companyName || "",

          description:
            myCompany.description || "",

          website:
            myCompany.website || "",

          location:
            myCompany.location || ""

        });

      } else {

        // No company found
        setCompany(null);

        // Reset form
        setFormData({
          companyName: "",
          description: "",
          website: "",
          location: ""
        });

      }

    } catch (err) {

      console.error(
        "My Company Error:",
        err
      );


      // =========================================
      // COMPANY NOT FOUND
      // =========================================

      if (err.response?.status === 404) {

        setCompany(null);

      } else {

        setError(
          err.response?.data?.message ||
          "Unable to load company details"
        );

      }

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


    setFormData((prev) => ({

      ...prev,

      [name]: value

    }));

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


      const response = await api.post(
        "/companies",
        formData
      );


      console.log(
        "Company Created:",
        response.data
      );


      // POST returns a single company object
      setCompany(response.data);


      // Update form data
      setFormData({

        companyName:
          response.data.companyName || "",

        description:
          response.data.description || "",

        website:
          response.data.website || "",

        location:
          response.data.location || ""

      });


      setSuccess(
        "Company created successfully!"
      );


    } catch (err) {

      console.error(
        "Create Company Error:",
        err
      );


      setError(
        err.response?.data?.message ||
        "Unable to create company"
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


    // Safety check
    if (!company || !company.id) {

      setError(
        "Company information is missing"
      );

      return;

    }


    try {

      setSaving(true);

      setError("");

      setSuccess("");


      const response = await api.put(

        `/companies/${company.id}`,

        formData

      );


      console.log(
        "Company Updated:",
        response.data
      );


      // Update company
      setCompany(response.data);


      // Update form data
      setFormData({

        companyName:
          response.data.companyName || "",

        description:
          response.data.description || "",

        website:
          response.data.website || "",

        location:
          response.data.location || ""

      });


      // Exit edit mode
      setIsEditing(false);


      setSuccess(
        "Company updated successfully!"
      );


    } catch (err) {

      console.error(
        "Update Company Error:",
        err
      );


      setError(
        err.response?.data?.message ||
        "Unable to update company"
      );


    } finally {

      setSaving(false);

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
          Loading company details...
        </p>

      </div>

    );

  }


  return (

    <div className="recruiter-company-page">


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

            <span>
              ⌂
            </span>

            Dashboard

          </button>


          {/* MY COMPANY */}

          <button
            className="recruiter-menu-item active"
          >

            <span>
              🏢
            </span>

            My Company

          </button>


          {/* MANAGE JOBS */}

          <button
            className="recruiter-menu-item"
            onClick={() =>
              navigate("/recruiter/jobs")
            }
          >

            <span>
              💼
            </span>

            Manage Jobs

          </button>


          {/* POST JOB */}

          <button
            className="recruiter-menu-item"
            onClick={() =>
              navigate("/recruiter/jobs/create")
            }
          >

            <span>
              ➕
            </span>

            Post a Job

          </button>


          {/* APPLICATIONS */}

          <button
            className="recruiter-menu-item"
            onClick={() =>
              navigate("/recruiter/applications")
            }
          >

            <span>
              📋
            </span>

            Applications

          </button>


        </div>


        {/* LOGOUT */}

        <div className="recruiter-sidebar-bottom">

          <button
            className="recruiter-menu-item logout"
            onClick={handleLogout}
          >

            <span>
              ↪
            </span>

            Logout

          </button>

        </div>


      </aside>


      {/* ================================= */}
      {/* MAIN CONTENT */}
      {/* ================================= */}

      <main className="recruiter-company-main">


        {/* HEADER */}

        <header className="company-page-header">

          <div>

            <h1>
              My Company
            </h1>

            <p>
              Manage your company profile and
              information.
            </p>

          </div>

        </header>


        {/* ================================= */}
        {/* ERROR MESSAGE */}
        {/* ================================= */}

        {error && (

          <div className="company-error">

            ⚠ {error}

          </div>

        )}


        {/* ================================= */}
        {/* SUCCESS MESSAGE */}
        {/* ================================= */}

        {success && (

          <div className="company-success">

            ✓ {success}

          </div>

        )}


        {/* ================================= */}
        {/* NO COMPANY */}
        {/* ================================= */}

        {!company && (

          <div className="company-form-card">


            {/* FORM HEADER */}

            <div className="company-form-header">

              <div className="company-icon">

                🏢

              </div>


              <div>

                <h2>
                  Create Your Company
                </h2>

                <p>
                  Add your company details to
                  start posting jobs.
                </p>

              </div>

            </div>


            {/* CREATE FORM */}

            <form
              onSubmit={handleCreateCompany}
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


              {/* DESCRIPTION */}

              <div className="form-group">

                <label>
                  Company Description
                </label>

                <textarea
                  name="description"
                  placeholder="Tell us about your company..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  required
                />

              </div>


              {/* WEBSITE + LOCATION */}

              <div className="form-row">


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


                {/* LOCATION */}

                <div className="form-group">

                  <label>
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    placeholder="Hyderabad, India"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />

                </div>


              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                className="company-submit-button"
                disabled={saving}
              >

                {saving
                  ? "Creating Company..."
                  : "Create Company →"}

              </button>


            </form>


          </div>

        )}


        {/* ================================= */}
        {/* COMPANY DETAILS */}
        {/* ================================= */}

        {company && !isEditing && (

          <div className="company-details-card">


            {/* PROFILE HEADER */}

            <div className="company-profile-header">


              <div className="company-large-icon">

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


            </div>


            {/* COMPANY INFO */}

            <div className="company-info-grid">


              {/* COMPANY NAME */}

              <div className="company-info-item">

                <small>
                  Company Name
                </small>

                <strong>
                  {company.companyName}
                </strong>

              </div>


              {/* LOCATION */}

              <div className="company-info-item">

                <small>
                  Location
                </small>

                <strong>
                  {company.location ||
                    "Not specified"}
                </strong>

              </div>


              {/* WEBSITE */}

              <div className="company-info-item">

                <small>
                  Website
                </small>

                <strong>
                  {company.website ||
                    "Not specified"}
                </strong>

              </div>


              {/* RECRUITER */}

              <div className="company-info-item">

                <small>
                  Recruiter
                </small>

                <strong>
                  {company.recruiterName ||
                    "Recruiter"}
                </strong>

              </div>


            </div>


            {/* DESCRIPTION */}

            <div className="company-description">

              <h3>
                About Company
              </h3>

              <p>
                {company.description ||
                  "No company description available."}
              </p>

            </div>


            {/* ACTIONS */}

            <div className="company-actions">


              {/* EDIT */}

              <button
                className="edit-company-button"
                onClick={() => {

                  setIsEditing(true);

                  setSuccess("");

                  setError("");

                }}
              >

                ✏ Edit Company

              </button>


              {/* MANAGE JOBS */}

              <button
                className="edit-company-button"
                onClick={() =>
                  navigate("/recruiter/jobs")
                }
              >

                💼 Manage Jobs

              </button>


              {/* POST JOB */}

              <button
                className="edit-company-button"
                onClick={() =>
                  navigate("/recruiter/jobs/create")
                }
              >

                ➕ Post a Job

              </button>


            </div>


          </div>

        )}


        {/* ================================= */}
        {/* EDIT COMPANY */}
        {/* ================================= */}

        {company && isEditing && (

          <div className="company-form-card">


            {/* EDIT HEADER */}

            <div className="company-form-header">

              <div className="company-icon">

                ✏

              </div>


              <div>

                <h2>
                  Edit Company
                </h2>

                <p>
                  Update your company information.
                </p>

              </div>

            </div>


            {/* EDIT FORM */}

            <form
              onSubmit={handleUpdateCompany}
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


              {/* DESCRIPTION */}

              <div className="form-group">

                <label>
                  Company Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  required
                />

              </div>


              {/* WEBSITE + LOCATION */}

              <div className="form-row">


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
                    required
                  />

                </div>


              </div>


              {/* EDIT ACTIONS */}

              <div className="edit-actions">


                {/* CANCEL */}

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {

                    setIsEditing(false);

                    setError("");

                    setSuccess("");

                  }}
                >

                  Cancel

                </button>


                {/* SAVE */}

                <button
                  type="submit"
                  className="company-submit-button"
                  disabled={saving}
                >

                  {saving
                    ? "Saving Changes..."
                    : "Save Changes →"}

                </button>


              </div>


            </form>


          </div>

        )}


      </main>


    </div>

  );

}

export default MyCompany;