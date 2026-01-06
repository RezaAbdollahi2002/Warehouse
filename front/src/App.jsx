import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import ProtectedLayout from './ProtectedLayout';
import {
  HomePage,
  EntryGate,
  HomePageNavbar,
  Dashboard,
  ForgotUsernameAndPassword,
  AddCompany,
  CompanyDetails,
  Documentations,
  MyCompanies,
  Settings,
  About,
} from './components/index';

const App = () => {
  return (
    <Routes>
      {/* Public */}
      <Route
        path="/"
        element={
          <>
            <HomePageNavbar />
            <HomePage />
          </>
        }
      />

      <Route
        path="/entrygate"
        element={
          <>
            <HomePageNavbar />
            <EntryGate />
          </>
        }
      />

      <Route
        path="/forgot-username-password"
        element={
          <>
            <HomePageNavbar />
            <ForgotUsernameAndPassword />
          </>
        }
      />

      {/* Protected: EVERYTHING under /dashboard */}
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<ProtectedLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add_company" element={<AddCompany />} />
          <Route path="company_details" element={<CompanyDetails />} />
          <Route path="documentations" element={<Documentations />} />
          <Route path="my_companies" element={<MyCompanies />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* About (choose: public or protected) */}
      <Route
        path="/about"
        element={
          <>
            <HomePageNavbar />
            <About />
          </>
        }
      />
    </Routes>
  );
};

export default App;
