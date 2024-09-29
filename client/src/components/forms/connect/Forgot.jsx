import React, { useState } from "react";

const Forgot = ({ onBack }) => {
  const [email, setEmail] = useState("");

  const handleForgot = (e) => {
    e.preventDefault();
    // Logic for handling password reset
    alert("Password reset link sent to your email!");
  };

  return (
    <div className="auth-wrapper">
      <h3>Forgot Password</h3>
      <form className="auth-form" onSubmit={handleForgot}>
        <div className="input-group email">
          <input
            type="email"
            className="field"
            id="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn submit">
          Reset Password
        </button>
        <button type="button" className="btn back" onClick={onBack}>
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default Forgot;