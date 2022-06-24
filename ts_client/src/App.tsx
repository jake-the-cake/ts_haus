import React from 'react';
import { Navbar } from './components/Navbar';

export const App:React.FC = () => {
  return (
    <div className='main-container'>
      <Navbar />
      <div className="test">howdy</div>
    </div>
  )
}