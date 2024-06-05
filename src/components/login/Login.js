import "./Login.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { doLoginInWithEmailAndPassword } from "../../firebase/auth";
import { Navigate } from "react-router-dom";

function Login() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [formData, setFormData] = useState(
        {
            email: "",
            password: "",
        }
    )
    const [isLoginInProgress, setIsLoginInProgress] = useState(false);

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    async function handleSubmit(event) {
        setIsSubmitting(true);
        event.preventDefault();
        if (!isLoginInProgress) {
            setIsLoginInProgress(true);
            try {
                await doLoginInWithEmailAndPassword(formData.email, formData.password);
            } catch (error) {
                setIsLoginInProgress(false);
                setErrorMsg(JSON.stringify(error));
            }
        } else {
            setErrorMsg("Please wait while we login you in!");
        }
        setIsSubmitting(false);
    }

    return(
        <div>
            {auth.currentUser && <Navigate to='/' />}
            <h2 className="mt-5 text-center">Login to your account to get started!</h2>
            {errorMsg && <div className="alert alert-danger w-50 mx-auto mt-3" role="alert">
                {errorMsg}
            </div>}
            <div className="login-card">
                <form className="row g-4" onSubmit={handleSubmit}>
                <div>
                    <label forhtml="email" className="form-label">Email</label>
                    <input type="email" 
                    className="form-control" 
                    id="email"
                    onChange={handleChange}
                    name="email"
                    value={formData.email}
                    required
                    />
                </div>

                <div>
                    <label forhtml="password" className="form-label">Password</label>
                    <input type="password" 
                    className="form-control" 
                    id="password"
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                    required
                    />
                </div>
                
                <div className="col-6">
                    <button type="submit" 
                    className="btn btn-primary ms-3">
                        {isSubmitting && <span className="spinner-border spinner-border-sm me-2"></span>}
                        Login
                    </button>
                </div>

                <div className="col-6">
                <p className="text-secondary">Don't have an account? <Link to="/users/signin">Signup here!</Link></p>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Login;