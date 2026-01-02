import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage, EntryGate, HomePageNavbar, Dashboard, MainNavbar,ForgotUsernameAndPassword, AddCompany, CompanyDetails } from './components/';
const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<>
            <HomePageNavbar />
            <HomePage />
          </>} />
      <Route
        path={'/entrygate'}
        element={
          <>
            <HomePageNavbar />
            <EntryGate />
          </>
        }
      />
      <Route
        path={'/forgot-username-password'}
        element={
          <>
            <HomePageNavbar />
            <ForgotUsernameAndPassword />
          </>
        }
      />
     <Route
        path={'/dashboard'}
        element={
          <>
            <MainNavbar />
            <Dashboard  />
          </>
        }
      />
      <Route
        path={'/dashboard/add_company'}
        element={
          <>
            <MainNavbar />
            <AddCompany  />
          </>
        }
      />
       <Route
        path={'/dashboard/company_details'}
        element={
          <>
            <MainNavbar />
            <CompanyDetails  />
          </>
        }
      />
    </Routes>
  );
};

export default App;
