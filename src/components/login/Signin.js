import "./Signin.css"
import { Link, Navigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { updateProfile } from "firebase/auth";
import { addUser } from "../../firebase/registerUser";

function Signin() {
    const [errorMsg, setErrorMsg] = useState(null);
    const [formData, setFormData] = useState(
        {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    )
    const [isSignInProgress, setIsSignInProgress] = useState(false);

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
        if (!isSignInProgress) {
            setIsSignInProgress(true);
            try {
                await doCreateUserWithEmailAndPassword(formData.email, formData.password);
                await updateProfile(auth.currentUser, { displayName: `${formData.firstName} ${formData.lastName}` });
                await addUser(formData);
                
            } catch (error) {
                setIsSignInProgress(false);
                setErrorMsg(error.message.split("Firebase: ")[1])
            }
        } else {
            console.log("Please wait while we create your account!");
        }
    }

    return(
        <div>
            {auth.currentUser && <Navigate to='/' />}
            <h2 className="mt-5 text-center">Create a new Account to get started!</h2>
            {errorMsg && <div className="alert alert-danger w-50 mx-auto mt-3" role="alert">
                {errorMsg}
            </div>}
            <div className="signin-card">
                <form className="row g-4" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label forhtml="firstName" className="form-label">First Name</label>
                        <input type="text" 
                        className="form-control" 
                        id="firstName"
                        onChange={handleChange}
                        name="firstName"
                        value={formData.firstName}/>
                    </div>
                    <div className="col-md-6">
                        <label forhtml="lastName" className="form-label">Last Name</label>
                        <input type="text" 
                        className="form-control" 
                        id="lastName"
                        onChange={handleChange}
                        name="lastName"
                        value={formData.lastName}/>
                    </div> 
                    <div>
                        <label forhtml="email" className="form-label">Email</label>
                        <input type="email" 
                        className="form-control" 
                        id="email"
                        onChange={handleChange}
                        name="email"
                        value={formData.email}/>
                    </div>
                    <div>
                        <label forhtml="password" className="form-label">Password</label>
                        <input type="password" 
                        className="form-control" 
                        id="password"
                        onChange={handleChange}
                        name="password"
                        value={formData.password}/>
                    </div>
                    
                    <div className="col-6">
                        <button type="submit" 
                        className="btn btn-primary">Sign in</button>
                    </div>
                    <div className="col-6">
                    <p className="text-secondary">Already have an account? <Link to="/users/login">Login here!</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin;