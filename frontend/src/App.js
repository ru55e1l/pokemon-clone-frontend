import './App.css';
import Login from './components/login/LoginPage';
import WelcomePage from "./components/Pages/WelcomePage";
import {createTheme, ThemeProvider} from "@mui/material";
import { Routes, Route } from 'react-router-dom'
import RequireAuth  from './features/auth/RequireAuth';

const theme = createTheme({
    palette: {
        mode: "dark",
    }
});

function App() {
  return (
      <ThemeProvider theme={theme}>
          <Routes>
              <Route index path="login" element={<Login/>} />
              <Route element={<RequireAuth />}>
                  <Route path="welcome" element={<WelcomePage/>} />
              </Route>

          </Routes>
      </ThemeProvider>

  );
}

export default App;
