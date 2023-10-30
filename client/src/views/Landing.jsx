import React from 'react';
import Navbar from '../components/Navbar';
import PlayersList from './PlayersList';

const Landing = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />
      <h1>Landing</h1>
      <PlayersList/>
    </div>
  );
};

export default Landing;
