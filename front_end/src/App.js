import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import DiseaseDetection from './pages/DiseaseDetection';
import AgriculturalNews from './pages/AgriculturalNews';
import Weather from './pages/Weather';
import Irrigation from './pages/Irrigation';
import Resources from './pages/Resources';
import LocustWatch from './pages/LocustWatch';
import { AppProvider } from './context/AppContext';
import './App.css';

function App() {
  return (
     <AppProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="disease-detection" element={<DiseaseDetection />} />
          <Route path="news" element={<AgriculturalNews />} />
          <Route path="weather" element={<Weather />} />
          <Route path="irrigation" element={<Irrigation />} />
          <Route path="resources" element={<Resources />} />
          <Route path="locust-watch" element={<LocustWatch />} />
        </Route>
      </Routes>
    </Router>
    </AppProvider>
  );
}

export default App;