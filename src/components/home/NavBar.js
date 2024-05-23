import { Link, Outlet } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import { auth } from "../../firebase/firebase";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { onAuthStateChanged } from "firebase/auth";
import logo from "./logo.png"

function NavBar() {
    const value = useContext(AuthContext);
    onAuthStateChanged(auth, (user) => {
    if (user) {
        value.setCurrentUser(user);
    } else {
        value.setCurrentUser(null);
    }
    });
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <img src={logo} alt="logo" height={50} className="p-1"/>
                <Link className="navbar-brand" to="/">Bibliophage</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/users/quizzes">Quizzes</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/users/newquiz">CreateQuiz</Link>
                    </li>
                    {
                    value.currentUser ? 
                        <li className="nav-item dropdown">
                        <button className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {value.currentUser.displayName ? value.currentUser.displayName : "Profile"}
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/users/myquizzes">My Quizzes</Link></li>
                            <li><Link className="dropdown-item" to="/" onClick={doSignOut}>Logout</Link></li>
                        </ul>
                        </li> 
                    : 
                        <li className="nav-item">
                        <Link className="nav-link" to="/users/login">Login</Link>
                        </li>
                    }
                </ul>
                </div>
            </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default NavBar;