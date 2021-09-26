import React from 'react'
import SignInSide from './components/SignInSide'
import SignUp from './components/SignUp'
import ForgotPWfirst from './components/ForgotPWfirst'
import ForgotPWsecond from './components/ForgotPWsecond'
import ForgotPWthird from './components/ForgotPWthird'
import ForgotIDfirst from './components/ForgotIDfirst'
import ForgotIDsecond from './components/ForgotIDsecond'
import Mainpage from './components/Mainpage'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
        <Route exact path='/' component={SignInSide}></Route>
        <Route exact path='/SignUp' component={SignUp}></Route>
        <Route exact path='/ForgotPWfirst' component={ForgotPWfirst}></Route>
        <Route exact path='/ForgotPWsecond' component={ForgotPWsecond}></Route>
        <Route exact path='/ForgotPWthird' component={ForgotPWthird}></Route>
        <Route exact path='/ForgotIDfirst' component={ForgotIDfirst}></Route>
        <Route exact path='/ForgotIDsecond' component={ForgotIDsecond}></Route>
        <Route exact path='/Mainpage' component={Mainpage}></Route>
      </Router>
    </div>
  );
}

export default App;
