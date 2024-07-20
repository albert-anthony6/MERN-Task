import { Link } from 'react-router-dom';
import { logout } from '../store/slices/userSlice';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

export default function AppHeader() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);

  return (
    <nav className="app-header">
      <div className="logo">
        <Link to="/" /> Task Creator
      </div>
      <ul>
        {currentUser ? (
          <li>
            <button className="btn" onClick={() => dispatch(logout())}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
