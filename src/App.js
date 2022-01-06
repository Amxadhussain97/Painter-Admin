
import { BrowserRouter } from 'react-router-dom';
import {
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './App.css';
import Login from './components/Registration/Login';
import Signup from './components/Registration/Signup';
import Protected from './components/Protected';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import NotFound from './components/NotFound';
import { CssBaseline } from '@material-ui/core';
import Info from './components/Body/Home/Info';
import MoreInfo from './components/Body/MoreDetails/MoreInfo';
import Gallery from './components/Body/MoreDetails/Gallery/Gallery';
import Photos from './components/Body/MoreDetails/Gallery/Photos';


const theme = createTheme({
  typography: {
    fontFamily: [
      'Open Sans',
      'sans-serif'

    ].join(','),

  },

  palette: {

  },


})

function App() {
  return (

    <BrowserRouter>
      <ThemeProvider theme={theme}>

        <Switch>
          <Redirect exact from="/home" to="/home/personalinfo" />
          <Route exact path="/home/:page" render={props => <Info {...props} />} />
          <Route path="/home/moreinfo/:id/:type" render={props => <MoreInfo {...props} />} />

          {/* <Route exact path={`/home/moreinfo/:id/Galleries`}>
            <Protected Cmp={Gallery} />
          </Route> */}
          {/* <Route exact path="/home/moreinfo/:id/Galleries/:galleryid/photos" render={props => <Photos{...props} />} /> */}
          {/* <Route exact path={`/home/moreinfo/:id/Galleries/:galleryid/photos`}>
            <Protected Cmp={Photos} />
          </Route> */}


          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route component={NotFound} />
        </Switch>
        <CssBaseline />
      </ThemeProvider>
    </BrowserRouter>

  );
}

export default App;
