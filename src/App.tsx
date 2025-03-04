// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './Components/Layout/MainLayout';
import { routes } from './routes';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './routes/SecureRoute'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<MainLayout />}>
            {routes}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
