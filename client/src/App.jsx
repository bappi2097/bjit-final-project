import { Fragment } from 'react';
import './App.css';
import Landing from './pages/Landing/Home/Landing';
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
