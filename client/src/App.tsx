import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Menu } from './components/Menu';
import { Navbar } from './components/Navbar';
import { Home as RecipeHome } from './pages/recipe/Home';

export const App:React.FC = () => {
  return (
    <BrowserRouter>
    <div className='main-container'>
      <Navbar />
      <Menu />
      <Routes>
        <Route path='ts_haus/cookbook' element={<RecipeHome />}>
          <Route path='add' element={<RecipeHome />} />
        </Route>
      </Routes>
    </div>
    </BrowserRouter>
  )
}