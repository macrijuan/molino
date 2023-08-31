import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./redux/store.js";
import Header from './Header.jsx';
import Home from './Home/Home.jsx';
import SignUp from './User/SignUp.jsx';
import SignIn from './User/SignIn.jsx';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Route path="/" component={Header}/>
        <Switch>
          <Route exact path="/sign_up" component={SignUp} />
          <Route exact path="/sign_in" component={SignIn} />
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/" component={Header} /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  </StrictMode>
,
  document.getElementById('root')
);