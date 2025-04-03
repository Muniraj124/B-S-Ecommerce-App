import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import your global styles
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// Render the App component wrapped with Router for routing functionality
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root') // This will mount your app to the 'root' div in index.html
);

