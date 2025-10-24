import './App.css'
import CatalogPage from "./pages/catalog/CatalogPage.tsx";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {RegisterPage} from "./pages/auth/register/RegisterPage.tsx";
import {LoginPage} from "./pages/auth/login/LoginPage.tsx";
import { AuthProvider } from './context/AuthContext.tsx';


function App() {
  return (
      <BrowserRouter>
          <AuthProvider>
              <Routes>
                  <Route path='/' element={<Navigate to='/login' replace />}></Route>
                  <Route path='/catalog' element={<CatalogPage/>}></Route>
                  <Route path='/register' element={<RegisterPage/>}></Route>
                  <Route path='/login' element={<LoginPage/>}></Route>
                  <Route path='*' element={<Navigate to='/login' replace />}></Route>
              </Routes>
          </AuthProvider>
      </BrowserRouter>
  )
}

export default App;
