import React from 'react';
import Monitoring from './components/Monitoring';
import TopBar from './components/Topbar';

const App = () => {
  return (
    <div className=' bg-blue-gray-400'>
      <TopBar />
      <Monitoring />
    </div>
  );
};

export default App;
