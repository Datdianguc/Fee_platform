import React from 'react';
import './App.css';
import Login from "./components/login"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <Router>
        <div className='App'>
          <nav>
            <ul>
              <li>
                <Link to="/">Login</Link>
              </li>
            </ul>
          </nav>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        </div>
    </Router>
  );
}

export default App;
