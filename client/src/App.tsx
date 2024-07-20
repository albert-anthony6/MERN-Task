import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppHeader from './components/AppHeader';

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" theme="colored" />
      <AppHeader />
      <Outlet />
    </>
  );
}

export default App;
