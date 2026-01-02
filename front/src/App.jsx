import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage, EntryGate, HomePageNavbar, Dashboard, MainNavbar,ForgotUsernameAndPassword } from './components/';
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
    </Routes>
  );
};

export default App;
