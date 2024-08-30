import React, { useState } from 'react';
import './CSS/LoginSignup.css'; // Ensure this path is correct

const LoginSignup = () => {
  const [state, setState] = useState("Login"); // Toggle between "Login" and "Sign Up"
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agree: false,
  });
  const [error, setError] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Fetch with authentication handling
  const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
        console.error('No auth token found');
        throw new Error('No auth token found');
    }

    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
    };

    try {
        let response = await fetch(url, options);

        if (response.status === 401) { // Token expired or invalid
            const refreshToken = localStorage.getItem('refresh-token');
            if (!refreshToken) {
                console.error('No refresh token found');
                throw new Error('No refresh token found');
            }

            const refreshResponse = await fetch('http://localhost:4000/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (refreshResponse.ok) {
                const { token: newToken } = await refreshResponse.json();
                localStorage.setItem('auth-token', newToken);
                options.headers['Authorization'] = `Bearer ${newToken}`;
                response = await fetch(url, options); // Retry the original request
            } else {
                console.error('Refresh token failed');
                localStorage.removeItem('auth-token');
                localStorage.removeItem('refresh-token');
                window.location.href = '/login';
            }
        }
        return response;
    } catch (error) {
        console.error('Fetch with auth error:', error);
        throw error;
    }
};


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    if (state === "Login") {
      await login();
    } else {
      await signup();
    }
  };

  // Handle login
  const login = async () => {
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('refresh-token', responseData.refreshToken); // Store refresh token if available
        window.location.replace("/");
      } else {
        setError(responseData.error || 'Login failed.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login.');
    }
  };

  // Handle signup
  const signup = async () => {
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('refresh-token', responseData.refreshToken); // Store refresh token if available
        window.location.replace("/");
      } else {
        setError(responseData.error || 'Signup failed.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An error occurred during signup.');
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {state === "Sign Up" && (
            <div className="loginsignup-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="loginsignup-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="loginsignup-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {state === "Sign Up" && (
            <div className="loginsignup-agree">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
              />
              <label htmlFor="agree">I agree to the terms and conditions</label>
            </div>
          )}
          <button type="submit">Continue</button>
          {state === "Sign Up" ? (
            <p className="loginsignup-login">
              Already have an account? <button type="button" onClick={() => setState("Login")}>Login</button>
            </p>
          ) : (
            <p className="loginsignup-login">
              Create An Account <button type="button" onClick={() => setState("Sign Up")}>Click Here</button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
