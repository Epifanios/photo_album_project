import React from 'react';
import { Routes, Route } from "react-router-dom";
import Users from './pages/Users';
import Albums from './pages/Albums';
import PageNotFound from './pages/PageNotFound';
import Photos from './pages/Photos';

function App() {
  return (
    <div className="App">    
      <Routes>
        <Route exact path="/" element={<Users />} />
        <Route path="user/:userId/albums" element={<Albums/>} />
        <Route path="user/:userId/album/:albumId/photos" element={<Photos/>} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
