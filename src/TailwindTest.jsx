import React from 'react';

// A simple component that uses Tailwind classes to verify they're working
function TailwindTest() {
  return (
    <div className="p-6 max-w-sm mx-auto bg-matrix-panel rounded-lg shadow-md">
      <h2 className="text-2xl font-matrix-hacker text-matrix-text-bright mb-4">
        Tailwind CSS Test
      </h2>
      <p className="text-matrix-text mb-4">
        If you can see this styled with Matrix colors, Tailwind is working correctly!
      </p>
      <div className="mt-4">
        <button className="matrix-button mr-2">
          Matrix Button
        </button>
        <button className="matrix-button bg-matrix-danger bg-opacity-20 border-matrix-danger">
          Danger Button
        </button>
      </div>
    </div>
  );
}

export default TailwindTest;
