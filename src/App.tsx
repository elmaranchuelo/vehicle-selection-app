import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import VehicleForm from  "./features/vehicleform";
import SubmittedDataPage from './features/SubmittedDataPage';
import './App.css'

const App: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<any>(null);
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<VehicleForm setSubmittedData={setSubmittedData}/>} /> 
        <Route path="/submitted" element={<SubmittedDataPage submittedData={submittedData} />} />
      </Routes>
    </Router>
  );
};

export default App;
