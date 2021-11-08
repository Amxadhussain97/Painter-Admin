
import { BrowserRouter } from 'react-router-dom';
import {
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './App.css';
import HeaderComponent from './components/Header/HeaderComponent';
import Login from './components/Registration/Login';
import Signup from './components/Registration/Signup';
import Protected from './components/Protected';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';




const theme = createTheme({
  palette: {

  }

})

function App() {
  return (


    <BrowserRouter>
      <ThemeProvider theme={theme}>

        <Switch>
          
          <Route path="/home">
            <Protected Cmp={HeaderComponent} />
          </Route>
          <Route path="/login">
            <Protected Cmp={Login} />
          </Route>
          <Route path="/signup">
            <Protected Cmp={Signup} />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>

  );
}

export default App;
