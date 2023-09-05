import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; 
import ForgotPassword from "./ForgotPassword";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result);
                if (result.data === "Success") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Login successful!',
                    }).then(() => {

                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Wrong password',
                    });
                }
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'An error occurred. Please try again later.',
                });
            });
    };

    const handleForgotPasswordClick = () => {
        setShowForgotPassword(true);
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
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
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
                </form>
                <p>
                    <span
                        className="text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={handleForgotPasswordClick}
                    >
                        Forgot password
                    </span>
                </p>
            </div>
            {showForgotPassword && <ForgotPassword />}
        </div>
    );
}

export default Login;
