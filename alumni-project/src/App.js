// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Common Pages
import Commondash from './Components/Commondash';
import Database from './Components/Database';

// Admin Auth
import AdminLogin from './Components/AdminLogin';
import AdminRegistration from './Components/AdminRegistration';

// Admin Layout
import Admin_Layout from './Admin/Admin_Layout';
import Admin_Dashboard from './Admin/Admin_Dashboard';
import Admin_AccountInfo from './Admin/Admin_Accountinfo';
import Admin_DonationContribution from './Admin/Admin_DonationContribution';
import Admin_Donations from './Admin/Admin_Donations';
import Admin_EventMangement from './Admin/Admin_EventMangement';
import Admin_FeedbackSupport from './Admin/Admin_FeedbackSupport';
import Admin_ForumPage from './Admin/Admin_ForumPage';
import Admin_FullAccountInfo from './Admin/Admin_FullAccountInfo';
import Admin_JobsInternships from './Admin/Admin_JobsInternships';
import Admin_Mentorship from './Admin/Admin_Mentorship';
import Admin_NewsNotices from './Admin/Admin_NewsNotices';
import Admin_ReportsAnalytics from './Admin/Admin_ReportsAnalytics';
import Admin_settings from './Admin/Admin_settings';
import Admin_UserManagement from './Admin/Admin_UserMangment';


// Student Auth & Dashboard
import StudentLogin from './Components/StudentLogin';
import StudentRegistration from './Components/StudentRegistration';
import StudentDashboard from './Components/StudentDashboard';
import StudentEvents from './Components/StudentEvents';
import StudentInternshipPlacement from './Components/StudentInternshipPlacement';
import StudentInternship from './Components/StudentInternship';
import StudentPlacement from './Components/StudentPlacement';
import StudentApplication from './Components/StudentApplication';
import StudentResumeBuilder from './Components/StudentResumeBuilder';
import StudentProfile from './Components/StudentProfile';
import StudentMentorship from './Components/StudentMentorship';
import StudentDiscussionForum from './Components/StudentDiscussionForum';
import StudentSetting from './Components/StudentSetting';

// Alumni Auth & Public
import AlumniLogin from './Components/AlumniLogin';
import AlumniRegistration from './Components/AlumniRegistration';
import Alumni_LoginForm from './Alumni/Alumni_LoginForm';
import Alumni_RegistrationForm from './Alumni/Alumni_RegistrationForm';
import Alumni_ResetPasswordForm from './Alumni/Alumni_ResetPasswordForm';

// Alumni Dashboard & Layout
import Alumni_DashboardLayout from './Alumni/Alumni_DashboardLayout';
import Alumni_Dashboard from './Alumni/Alumni_Dashboard';
import Alumni_Sidebar from './Alumni/Alumni_Sidebar';
import Alumni_Events from './Alumni/Alumni_Events';
import Alumni_JobBoard from './Alumni/Alumni_JobBoard';
import Alumni_Mentorship from './Alumni/Alumni_Mentorship';
import Alumni_Forum from './Alumni/Alumni_Forum';
import Alumni_Networking from './Alumni/Alumni_Networking';
import Alumni_News from './Alumni/Alumni_News';
import Alumni_Donations from './Alumni/Alumni_Donations';
import Alumni_Settings from './Alumni/Alumni_Settings';
import Alumni_Contributions from './Alumni/Alumni_Contributions';
import AlumniProfile from './Alumni/AlumniProfile';
import Alumni_OfferMentorshipForm from './Alumni/Alumni_OfferMentorshipForm';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Commondash />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminregistration" element={<AdminRegistration />} />
        <Route path="/login" element={<AlumniLogin />} />
        <Route path="/alumniregistration" element={<AlumniRegistration />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/studentregistration" element={<StudentRegistration />} />
        <Route path="/database" element={<Database />} />

        {/* Student Dashboard */}
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/studentevents" element={<StudentEvents />} />
        <Route path="/studentinternshipplacement" element={<StudentInternshipPlacement />} />
        <Route path="/studentinternship" element={<StudentInternship />} />
        <Route path="/studentplacement" element={<StudentPlacement />} />
        <Route path="/studentapplication" element={<StudentApplication />} />
        <Route path="/studentresumebuilder" element={<StudentResumeBuilder />} />
        <Route path="/studentprofile" element={<StudentProfile />} />
        <Route path="/studentmentorship" element={<StudentMentorship />} />
        <Route path="/studentdiscussionforum" element={<StudentDiscussionForum />} />
        <Route path="/studentsetting" element={<StudentSetting />} />

        {/* Alumni Auth */}
        <Route path="/alumni_loginform" element={<Alumni_LoginForm />} />
        <Route path="/alumni_registrationform" element={<Alumni_RegistrationForm />} />
        <Route path="/alumni_resetpasswordform" element={<Alumni_ResetPasswordForm />} />

        {/* Alumni Dashboard */}
        <Route element={<Alumni_DashboardLayout />}>
          <Route path="/alumni_dashboard" element={<Alumni_Dashboard />} />
          <Route path="/alumni_sidebar" element={<Alumni_Sidebar />} />
          <Route path="/alumni_events" element={<Alumni_Events />} />
          <Route path="/alumni_jobs" element={<Alumni_JobBoard />} />
          <Route path="/alumni_mentorship" element={<Alumni_Mentorship />} />
          <Route path="/alumni_forum" element={<Alumni_Forum />} />
          <Route path="/alumni_networking" element={<Alumni_Networking />} />
          <Route path="/alumni_news" element={<Alumni_News />} />
          <Route path="/alumni_donation" element={<Alumni_Donations />} />
          <Route path="/alumni_settings" element={<Alumni_Settings />} />
          <Route path="/alumni_contributions" element={<Alumni_Contributions />} />
          <Route path="/alumni_profile" element={<AlumniProfile />} />
          <Route path="/alumni_offermentorship" element={<Alumni_OfferMentorshipForm />} />
        </Route>

        {/* Admin Routes with Admin Layout */}
        <Route element={<Admin_Layout />}>
          <Route path="/admin_dashboard" element={<Admin_Dashboard />} />
          <Route path="/admin_accountinfo" element={<Admin_AccountInfo />} />
          <Route path="/admin_fullaccountinfo" element={<Admin_FullAccountInfo />} />
          <Route path="/admin_donationcontribution" element={<Admin_DonationContribution />} />
          <Route path="/admin_donations" element={<Admin_Donations />} />
          <Route path="/admin_eventmangment" element={<Admin_EventMangement />} />
          <Route path="/admin_feedback&support" element={<Admin_FeedbackSupport />} />
          <Route path="/admin_forumpage" element={<Admin_ForumPage />} />
          <Route path="/admin_job&internships" element={<Admin_JobsInternships />} />
          <Route path="/admin_mentoership" element={<Admin_Mentorship />} />
          <Route path="/admin_news&notices" element={<Admin_NewsNotices />} />
          <Route path="/admin_reports" element={<Admin_ReportsAnalytics />} />
          <Route path="/admin_settings" element={<Admin_settings />} />
          <Route path="/admin_usermangment" element={<Admin_UserManagement />} />
          
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
