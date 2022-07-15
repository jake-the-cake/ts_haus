import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Menu } from './components/Menu';
import { Navbar } from './components/Navbar';
import { AddRecipe } from './pages/recipe/AddRecipe';
import { RecipeHome } from './pages/recipe/RecipeHome';
import { MyCookbook } from './pages/recipe/MyCookbook';
import { RecipeView } from './pages/recipe/RecipeView';

export const App:React.FC = () => {
  return (
    <BrowserRouter>
    <div className='main-container'>
      <Navbar />
      <Menu />
      <Routes>
        <Route path='ts_haus/cookbook'>
          <Route path='' element={<RecipeHome />} />
          <Route path='add' element={<AddRecipe />} />
          <Route path=':user'>
            <Route path='' element={<MyCookbook />} />
          </Route>
          <Route path='recipe'>
            <Route path=':slug' element={<RecipeView />}/>
          </Route>
        </Route>
      </Routes>
    </div>
    </BrowserRouter>
  )
}