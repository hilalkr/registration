import { useState } from "react";
import axios from "axios"; 

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetStatus, setResetStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  

    axios
      .post("http://localhost:3001/reset-password", { email })
      .then((response) => {

        console.log(response.data); 
        setResetStatus("success");
      })
      .catch((error) => {
        console.error(error);
        setResetStatus("error");
      });
  };
  

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            autoComplete="off"
            name="email"
            className="form-control rounded-0"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <button type="submit" className="btn btn-primary rounded-0">
          Reset Password
        </button>
      </form>
      {resetStatus === "success" && (
        <div className="alert alert-success mt-3">
          Password reset link sent successfully!
        </div>
      )}
      {resetStatus === "error" && (
        <div className="alert alert-danger mt-3">
          An error occurred. Please try again later.
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
