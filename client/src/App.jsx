import { Fragment, useContext } from 'react';
import './App.css';
import Landing from './pages/Landing/Home/Landing';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './store/auth-context';
import Admin from './pages/Admin/Admin';

const App = () => {
  const auth = useContext(AuthContext);
  return (
    <Fragment>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        {
          auth.isAdmin ? <Admin /> : <Landing />
        }
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
