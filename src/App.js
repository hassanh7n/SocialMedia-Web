
import { useSelector } from 'react-redux';
import './App.css';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import ProfilePage from './Components/ProfilePage';
import ProtectedRoutes from './pages/ProtectedRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const {mode} = useSelector((store) => store.auth);
  console.log(mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)),[mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <Routes>
            <Route path='/' element={
        <ProtectedRoutes>
        <HomePage/>
      </ProtectedRoutes>
      }>
          
        </Route>
          <Route path='/:id' element={
          <ProtectedRoutes>
            <ProfilePage />
          </ProtectedRoutes>
          
          }/>
              <Route path='/login' element={<LoginPage />} /> 
             
            </Routes>

        </ThemeProvider>
        <ToastContainer position='top-center' />
      </BrowserRouter>
    </div>
  );
}

export default App;
