import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Menu } from './components/Menu';
import { Navbar } from './components/Navbar';
import { Home as RecipeHome } from './pages/recipe/Home';
import MyCookbook from './pages/recipe/MyCookbook';

export const App:React.FC = () => {
  return (
    <BrowserRouter>
    <div className='main-container'>
      <Navbar />
      <Menu />
      <Routes>
        <Route path='ts_haus/cookbook'>
          <Route path='add' element={<RecipeHome />} />
          <Route path=':slug'>
            <Route path='' element={<MyCookbook />}/>
          </Route>
        </Route>
      </Routes>
    </div>
    </BrowserRouter>
  )
}