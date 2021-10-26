import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Info = (props) => {
    return (
        <ToastContainer
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
    )
}