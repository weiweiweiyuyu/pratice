import logo from './logo.svg';
import './App.css';
import MyDate from './components/myDate'
import{BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom'

function App() {
  var names = ['Alice', 'Emily', 'Kate'];
  const myData = "hhhhh"
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        {
          names.map(function(name){
            return <div>Hello,{name}</div>
          })
        }
      </div>
      <h2>
        <span>{myData}</span>
      </h2>
      <ul>
         
      </ul>
      <div>
      {/* <Router>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
      <Routes>
          <Route path="/about" element={<MyDate/>}></Route>
          <Route path="/inbox" element={<MyDate/>}></Route>
      </Routes>    
  </Router> */}
      </div>
    </div>
  );
}

export default App;
