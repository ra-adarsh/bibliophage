import { Link } from "react-router-dom";

function QuizDisplayCard({Quiz}) {
    return (
        <div className="w-25 p-2">
        <div className="card">
        <div className="card-body">
            <h5 className="card-title">{Quiz.QuizName}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{Quiz.Author}</h6>
            <p className="card-text">{Quiz.Description}</p>
            <Link to= "/users/quiz" state={{ id: Quiz.id }} className="card-link text-decoration-none">Go to Quiz→</Link>
        </div>
        </div>
        </div>
    )
}

export default QuizDisplayCard;