import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Users from './pages/Users';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
