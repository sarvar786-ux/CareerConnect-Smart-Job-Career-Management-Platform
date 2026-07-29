import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

  // ==========================================
  // STATE
  // ==========================================

  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [activeSection, setActiveSection] = useState("dashboard");

  const [loading, setLoading] = useState(true);


  // ==========================================
  // TOKEN
  // ==========================================

  const token = localStorage.getItem("token");


  // ==========================================
  // AXIOS CONFIG
  // ==========================================

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };


  // ==========================================
  // LOAD ALL ADMIN DATA
  // ==========================================

  useEffect(() => {

    const loadAdminData = async () => {

      try {

        await Promise.all([
          loadUsers(),
          loadCompanies(),
          loadJobs(),
          loadApplications()
        ]);

      } catch (error) {

        console.error(
          "Error loading admin data:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    loadAdminData();

  }, []);


  // ==========================================
  // GET USERS
  // ==========================================

  const loadUsers = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/users",
        config
      );

      setUsers(response.data);

    } catch (error) {

      console.error(
        "Error loading users:",
        error
      );

    }

  };


  // ==========================================
  // GET COMPANIES
  // ==========================================

  const loadCompanies = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/companies",
        config
      );

      setCompanies(response.data);

    } catch (error) {

      console.error(
        "Error loading companies:",
        error
      );

    }

  };


  // ==========================================
  // GET JOBS
  // ==========================================

  const loadJobs = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/jobs",
        config
      );

      setJobs(response.data);

    } catch (error) {

      console.error(
        "Error loading jobs:",
        error
      );

    }

  };


  // ==========================================
  // GET APPLICATIONS
  // ==========================================

  const loadApplications = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/applications",
        config
      );

      setApplications(response.data);

    } catch (error) {

      console.error(
        "Error loading applications:",
        error
      );

    }

  };


  // ==========================================
  // DELETE USER
  // ==========================================

  const deleteUser = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(
        `http://localhost:8080/api/users/${id}`,
        config
      );

      setUsers(
        users.filter(
          user => user.id !== id
        )
      );

      alert(
        "User deleted successfully"
      );

    } catch (error) {

      console.error(
        "Delete user error:",
        error
      );

      alert(
        "Failed to delete user"
      );

    }

  };


  // ==========================================
  // DELETE COMPANY
  // ==========================================

  const deleteCompany = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(
        `http://localhost:8080/api/companies/${id}`,
        config
      );

      setCompanies(
        companies.filter(
          company =>
            company.id !== id
        )
      );

      alert(
        "Company deleted successfully"
      );

    } catch (error) {

      console.error(
        "Delete company error:",
        error
      );

      alert(
        "Failed to delete company"
      );

    }

  };


  // ==========================================
  // DELETE JOB
  // ==========================================

  const deleteJob = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(
        `http://localhost:8080/api/admin/${id}`,
        config
      );

      setJobs(
        jobs.filter(
          job =>
            job.id !== id
        )
      );

      alert(
        "Job deleted successfully"
      );

    } catch (error) {

      console.error(
        "Delete job error:",
        error
      );

      alert(
        "Failed to delete job"
      );

    }

  };


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    window.location.href =
      "/login";

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="admin-loading">

        <h2>
          Loading Admin Dashboard...
        </h2>

      </div>

    );

  }


  // ==========================================
  // MAIN DASHBOARD
  // ==========================================

  return (

    <div className="admin-container">


      {/* ================================= */}
      {/* SIDEBAR */}
      {/* ================================= */}

      <aside className="admin-sidebar">

        <h2>
          CareerAI
        </h2>

        <p className="admin-role">
          Administrator
        </p>


        {/* DASHBOARD */}

        <button
          onClick={() =>
            setActiveSection("dashboard")
          }
        >
          📊 Dashboard
        </button>


        {/* USERS */}

        <button
          onClick={() =>
            setActiveSection("users")
          }
        >
          👥 Users
        </button>


        {/* COMPANIES */}

        <button
          onClick={() =>
            setActiveSection("companies")
          }
        >
          🏢 Companies
        </button>


        {/* JOBS */}

        <button
          onClick={() =>
            setActiveSection("jobs")
          }
        >
          💼 Jobs
        </button>


        {/* APPLICATIONS */}

        <button
          onClick={() =>
            setActiveSection("applications")
          }
        >
          📄 Applications
        </button>


        {/* LOGOUT */}

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </aside>



      {/* ================================= */}
      {/* MAIN CONTENT */}
      {/* ================================= */}

      <main className="admin-main">


        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="admin-header">

          <div>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Manage CareerAI platform
            </p>

          </div>

        </div>



        {/* ================================= */}
        {/* DASHBOARD SECTION */}
        {/* ================================= */}

        {activeSection === "dashboard" && (

          <div className="admin-section">

            <h2>
              Platform Overview
            </h2>


            <div className="stats-grid">


              {/* ================================= */}
              {/* USERS CARD */}
              {/* ================================= */}

              <div
                className="stat-card"
                onClick={() =>
                  setActiveSection("users")
                }
                style={{
                  cursor: "pointer"
                }}
              >

                <h3>
                  👥
                </h3>

                <h2>
                  {users.length}
                </h2>

                <p>
                  Total Users
                </p>

                <small>
                  Click to manage users
                </small>

              </div>



              {/* ================================= */}
              {/* COMPANIES CARD */}
              {/* ================================= */}

              <div
                className="stat-card"
                onClick={() =>
                  setActiveSection("companies")
                }
                style={{
                  cursor: "pointer"
                }}
              >

                <h3>
                  🏢
                </h3>

                <h2>
                  {companies.length}
                </h2>

                <p>
                  Total Companies
                </p>

                <small>
                  Click to manage companies
                </small>

              </div>



              {/* ================================= */}
              {/* JOBS CARD */}
              {/* ================================= */}

              <div
                className="stat-card"
                onClick={() =>
                  setActiveSection("jobs")
                }
                style={{
                  cursor: "pointer"
                }}
              >

                <h3>
                  💼
                </h3>

                <h2>
                  {jobs.length}
                </h2>

                <p>
                  Total Jobs
                </p>

                <small>
                  Click to manage jobs
                </small>

              </div>



              {/* ================================= */}
              {/* APPLICATIONS CARD */}
              {/* ================================= */}

              <div
                className="stat-card"
                onClick={() =>
                  setActiveSection("applications")
                }
                style={{
                  cursor: "pointer"
                }}
              >

                <h3>
                  📄
                </h3>

                <h2>
                  {applications.length}
                </h2>

                <p>
                  Total Applications
                </p>

                <small>
                  Click to manage applications
                </small>

              </div>


            </div>

          </div>

        )}



        {/* ================================= */}
        {/* USERS SECTION */}
        {/* ================================= */}

        {activeSection === "users" && (

          <div className="admin-section">

            <button
              onClick={() =>
                setActiveSection("dashboard")
              }
            >
              ← Back to Dashboard
            </button>

            <h2>
              Manage Users
            </h2>


            <table>

              <thead>

                <tr>

                  <th>
                    ID
                  </th>

                  <th>
                    Name
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Role
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {users.map(
                  user => (

                    <tr
                      key={
                        user.id
                      }
                    >

                      <td>
                        {user.id}
                      </td>

                      <td>
                        {user.name}
                      </td>

                      <td>
                        {user.email}
                      </td>

                      <td>
                        {user.role}
                      </td>

                      <td>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteUser(
                              user.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}



        {/* ================================= */}
        {/* COMPANIES SECTION */}
        {/* ================================= */}

        {activeSection === "companies" && (

          <div className="admin-section">

            <button
              onClick={() =>
                setActiveSection("dashboard")
              }
            >
              ← Back to Dashboard
            </button>

            <h2>
              Manage Companies
            </h2>


            <table>

              <thead>

                <tr>

                  <th>
                    ID
                  </th>

                  <th>
                    Company Name
                  </th>

                  <th>
                    Location
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {companies.map(
                  company => (

                    <tr
                      key={
                        company.id
                      }
                    >

                      <td>
                        {company.id}
                      </td>

                      <td>
                        {company.companyName}
                      </td>

                      <td>
                        {company.location}
                      </td>

                      <td>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteCompany(
                              company.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}



        {/* ================================= */}
        {/* JOBS SECTION */}
        {/* ================================= */}

        {activeSection === "jobs" && (

          <div className="admin-section">

            <button
              onClick={() =>
                setActiveSection("dashboard")
              }
            >
              ← Back to Dashboard
            </button>

            <h2>
              Manage Jobs
            </h2>


            <table>

              <thead>

                <tr>

                  <th>
                    ID
                  </th>

                  <th>
                    Title
                  </th>

                  <th>
                    Company
                  </th>

                  <th>
                    Location
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {jobs.map(
                  job => (

                    <tr
                      key={
                        job.id
                      }
                    >

                      <td>
                        {job.id}
                      </td>

                      <td>
                        {job.title}
                      </td>

                      <td>
                        {job.companyName}
                      </td>

                      <td>
                        {job.location}
                      </td>

                      <td>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteJob(
                              job.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}



        {/* ================================= */}
        {/* APPLICATIONS SECTION */}
        {/* ================================= */}

        {activeSection === "applications" && (

          <div className="admin-section">

            <button
              onClick={() =>
                setActiveSection("dashboard")
              }
            >
              ← Back to Dashboard
            </button>

            <h2>
              All Applications
            </h2>


            <table>

              <thead>

                <tr>

                  <th>
                    ID
                  </th>

                  <th>
                    Applicant
                  </th>

                  <th>
                    Job
                  </th>

                  <th>
                    Company
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {applications.map(
                  application => (

                    <tr
                      key={
                        application.id
                      }
                    >

                      <td>
                        {
                          application.id
                        }
                      </td>

                      <td>
                        {
                          application.userName
                        }
                      </td>

                      <td>
                        {
                          application.jobTitle
                        }
                      </td>

                      <td>
                        {
                          application.companyName
                        }
                      </td>

                      <td>
                        {
                          application.status
                        }
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </main>

    </div>

  );

}

export default AdminDashboard;