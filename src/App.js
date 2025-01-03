
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
import Messenger from './Components/messenger/Massenger';
import 'react-toastify/dist/ReactToastify.css';
import SharedLayout from './Components/widget/SharedLayout';
import Chat from './Components/messenger/Chat';

function App() {
  const {mode} = useSelector((store) => store.auth);
  // console.log(mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)),[mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <Routes>
            <Route path='/' element={
              <ProtectedRoutes>                                                 
                <SharedLayout/>
              </ProtectedRoutes>
              }>
              <Route index element={<HomePage />} />
               <Route path='/:id' element={<ProfilePage/>} />
                <Route path='/messenger' element={<Messenger/>} />
                <Route path='/messenger/:id' element={<Chat/>} />

              </Route>


               <Route path='/login' element={<LoginPage />} />
            </Routes>

        </ThemeProvider>
        <ToastContainer position='top-center' />
      </BrowserRouter>
    </div>
  );
}

export default App;
