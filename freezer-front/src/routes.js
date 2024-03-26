// En tu archivo routes.js (o en App.js si no tienes un archivo de rutas separado)
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage, SetOrders } from './pages';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/crear_ordenes" element={<SetOrders />} />
      {/* Más rutas */}
    </Routes>
  </Router>
);

export default AppRouter;
