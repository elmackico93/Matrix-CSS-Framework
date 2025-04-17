import React, { useState } from 'react';
import './App.css';
import TailwindTest from './TailwindTest';
import logo from './logo.svg';
import ComponentTestPage from './ComponentTestPage';

function App() {
  const [showTestPage, setShowTestPage] = useState(true);
  
  return (
    <div className="min-h-screen bg-matrix-bg">
      {/* Toggle button for switching views */}
      <div className="p-4 flex justify-center">
        {/* <button 
          className="px-4 py-2 bg-matrix-secondary border border-matrix-primary text-matrix-text rounded hover:bg-matrix-primary hover:bg-opacity-20 transition-colors"
          onClick={() => setShowTestPage(!showTestPage)}
        >
          {showTestPage ? 'Show App Home' : 'Show Component Test Page'}
        </button> */}
      </div>
      
      {showTestPage ? (
        <ComponentTestPage />
      ) : (
        <div>
          {/* Matrix Tailwind test component */}
          <div className="mb-8 p-4 border border-matrix-border rounded">
            <h2 className="text-xl mb-4">Tailwind Test Component</h2>
            <TailwindTest />
          </div>
          
          {/* Original Create React App content */}
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;