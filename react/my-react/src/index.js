import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MyDate from './components/myDate'
import MyDay from './components/myDay'
// import { Router, Route} from 'react-router'
import{BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom'

// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <div>
    {/* <App /> */}
    {/* <MyDate /> */}
    <div>
      <Router>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/inbox">Inbox</Link></li>
      <Routes>
          <Route path="/about" element={<MyDate/>}></Route>
          <Route path="/inbox" element={<MyDay/>}></Route>
      </Routes>    
  </Router>
      </div>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
