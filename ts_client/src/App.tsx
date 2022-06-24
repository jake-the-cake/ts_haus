import React from 'react';
import { Menu } from './components/Menu';
import { Navbar } from './components/Navbar';

export const App:React.FC = () => {
  return (
    <div className='main-container'>
      <Navbar />
      <Menu />
      <div className="test">howdy</div>
    </div>
  )
}