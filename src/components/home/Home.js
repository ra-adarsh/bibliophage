import "./Home.css"
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="d-flex flex-column justify-content-around align-items-center w-75 home-h mx-auto mt-n5">
            <h1 className="title">Easily convert your textual materials into an Interative Quiz!</h1>
            <Link to="/users/newquiz" className="link-style"><button className="start-button">Get Started!</button></Link>
        </div>
    )
}

export default Home;