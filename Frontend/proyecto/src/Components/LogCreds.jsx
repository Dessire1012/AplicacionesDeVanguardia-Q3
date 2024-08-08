import React from 'react';
import '../Styles/LogCreds.css';

function LogCreds() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="email" className="label">Email address</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          className="input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="label">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="input"
        />
      </div>

      <button type="submit" className="button">
        Sign In
      </button>
    </form>
  );
}

export default LogCreds;
