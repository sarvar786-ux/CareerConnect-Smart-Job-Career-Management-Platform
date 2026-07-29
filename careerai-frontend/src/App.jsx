import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

// ==============================
// AUTH PAGES
// ==============================
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDetails from "./pages/jobSeeker/JobDetails";
// ==============================
// JOB SEEKER PAGES
// ==============================
import JobSeekerDashboard from "./pages/jobSeeker/JobSeekerDashboard";
import Jobs from "./pages/jobSeeker/Jobs";
import MyApplications from "./pages/jobSeeker/MyApplications";

// ==============================
// RECRUITER PAGES
// ==============================
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";

// ==============================
// ADMIN PAGES
// ==============================
import AdminDashboard from "./pages/admin/AdminDashboard";

// ==============================
// RECRUITER PAGES
// ==============================
import MyCompany from "./pages/recruiter/MyCompany";
import CreateJob from "./pages/recruiter/CreateJob";
import MyJobs from "./pages/recruiter/MyJobs";
import RecruiterJobs from "./pages/recruiter/RecruiterJobs";
import EditJob from "./pages/recruiter/EditJob";
import RecruiterJobDetails from "./pages/recruiter/JobDetails";
import RecruiterApplications from "./pages/recruiter/RecruiterApplications";

// ==============================
// APP
// ==============================
function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* ================================= */}
        {/* DEFAULT ROUTE */}
        {/* ================================= */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />


        {/* ================================= */}
        {/* AUTHENTICATION */}
        {/* ================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ================================= */}
        {/* JOB SEEKER */}
        {/* ================================= */}

        <Route
          path="/job-seeker/dashboard"
          element={
            <JobSeekerDashboard />
          }
        />

        <Route
          path="/job-seeker/jobs"
          element={
            <Jobs />
          }
        />
        <Route
          path="/job-seeker/jobs/:id"
          element={<JobDetails />}
        />

        <Route
          path="/job-seeker/applications"
          element={
            <MyApplications />
          }
        />


        {/* ================================= */}
        {/* RECRUITER */}
        {/* ================================= */}

        <Route
          path="/recruiter/dashboard"
          element={
            <RecruiterDashboard />
          }
        />
        <Route
          path="/recruiter/company"
          element={<MyCompany />}
        />
        <Route
          path="/recruiter/jobs"
          element={
            <MyJobs />
          }
        />
        <Route
          path="/recruiter/all-jobs"
          element={<RecruiterJobs />}
        />
        <Route
          path="/recruiter/jobs/create"
          element={<CreateJob />}
        />
        <Route
          path="/recruiter/jobs/edit/:id"
          element={<EditJob />}
        />
        <Route
          path="/recruiter/jobs/:id"
          element={<RecruiterJobDetails />}
        />
        <Route
          path="/recruiter/applications"
          element={<RecruiterApplications />}
        />
        {/* ================================= */}
        {/* ADMIN */}
        {/* ================================= */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminDashboard />
          }
        />
      
        {/* ================================= */}
        {/* PAGE NOT FOUND */}
        {/* ================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;