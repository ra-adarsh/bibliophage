import "./Login.css"
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { doLoginInWithEmailAndPassword, doSignInWithGoogle } from "../../firebase/auth";
import { AuthContext } from "../../contexts/authContext";
import { Navigate } from "react-router-dom";

function Login() {
    const value = useContext(AuthContext);
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
            console.log("Please wait while we login you in!");
        }
    }

    // async function googleLogin(event) {
    //     event.preventDefault();
    //     if (!isLoginInProgress) {
    //         setIsLoginInProgress(true);
    //         doSignInWithGoogle().catch(error => {
    //             setIsLoginInProgress(false);
    //         })
    //     }
    // }

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
                    />
                </div>
                
                <div className="col-6">
                    <button type="submit" 
                    className="btn btn-primary ms-3">
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