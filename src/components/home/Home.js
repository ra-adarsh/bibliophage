import "./Home.css"
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="d-flex flex-column align-items-center w-75 mt-5 mx-auto">
            <h1 className="title">Easily convert your textual materials into a Quiz!</h1>
            <Link to="/users/newquiz" className="link-style"><button className="start-button">Get Started!</button></Link>
        </div>
    )
}

export default Home;