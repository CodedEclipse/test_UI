import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/system';


import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

// import './i18n';
const HomeRoutes = lazy(() => import('./routes/HomeRoutes'));
const AdminRoutes = lazy(() => import('./routes/AdminRoutes'));
// const EntityRoutes = lazy(() => import('./routes/EntityRoutes'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <Suspense fallback={null}>
      {/* <React.StrictMode> */}
      <BrowserRouter basename='/'>
        <HomeRoutes />
        {/* <AdminRoutes /> */}
      </BrowserRouter>
      <BrowserRouter basename='/admin'>
        <AdminRoutes />
      </BrowserRouter>
      <ToastContainer />
      {/* </React.StrictMode> */}
    </Suspense>
  </LocalizationProvider>
);

