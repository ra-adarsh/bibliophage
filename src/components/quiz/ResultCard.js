import { Link } from "react-router-dom";

function ResultCard(props) {
    const Percentage = (props.correct / props.questionNo) * 100;
    return (
        <div className="d-flex flex-column align-items-center">
            <div className="card text-bg-light mb-3 w-50 mx-auto mt-5">
                <div className="card-header text-center">Result</div>
                <div className="card-body text-center">
                    <h5 className="card-title">Correct: {props.correct}</h5>
                    <h5 className="card-title">Incorrect: {props.questionNo - props.correct}</h5>
                    <h5 className="card-title">Percentage: {Percentage}%</h5>
                    <h5 className="card-title">Score: {props.score}</h5>
                </div>
            </div>
            <Link to="/users/myquizzes"><button className="btn btn-success mt-5">Go Back</button></Link>
        </div>
    )
}

export default ResultCard;