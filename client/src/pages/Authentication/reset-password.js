import React from "react";
import "./reset-password.css";

function ResetPassword({ mode }) {
  return (
    <div className={`card login-form-${mode}`}>
      <div className="card-body">
        <h3 className={`card-title-${mode} text-center`}>Reset password</h3>
        <div className="card-text">
          <form>
            <div className={`form-group-${mode}`}>
              <label htmlFor="exampleInputEmail1">
                Enter your email address
              </label>
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Enter your email address"
                required
              />
            </div>

            <button
              type="submit"
              className=" submitButton btn btn-primary btn-block"
            >
              Send password reset email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
