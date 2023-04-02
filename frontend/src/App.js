import './App.css';
import Login from './components/login/LoginPage';
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark",
    }
});

function App() {
  return (
      <ThemeProvider theme={theme}>
          <div className="App">
              <Login/>
          </div>
      </ThemeProvider>

  );
}

export default App;
