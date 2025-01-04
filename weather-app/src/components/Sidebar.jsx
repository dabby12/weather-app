import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-blue-500 text-white p-6 flex flex-col fixed">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        <li>
          <a href="#" className="hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Settings
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            About
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
