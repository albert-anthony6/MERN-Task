import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { register } from '../store/slices/userSlice';
import { useAppDispatch } from '../store/configureStore';
import LoadingSpinner from '../components/LoadingSpinner';

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { name, email, password, confirmPassword } = formData;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      toast.error('Passwords must match.');
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <main className="register-form">
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={onChange}
            />
          </div>
          <div
            className={
              name && email && password && confirmPassword ? 'form-group' : 'form-group disabled'
            }
          >
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
