import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './component/dashboard/index';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
