import React from "react";
import "./Styles/LogCreds.css";

function LogCreds() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="name" className="label">
          User name
        </label>
        <input
          type="name"
          id="name"
          placeholder="Enter name"
          className="input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="label">
          Password
        </label>
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

      <a href="faceID">Use Face ID to Log In</a>
    </form>
  );
}

export default LogCreds;
