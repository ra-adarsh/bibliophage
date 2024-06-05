import { useState } from "react";

function Message(props) {
    return (
        <div className={`alert alert-${props.style} mt-3 w-50 m-auto text-center`} role="alert">
            {props.style === "success" ? "Correct!" : `Incorrect! Answer is "${props.correctAnswer}"`}
        </div>
    )
}

function QuizCard(props) {
    const [answer, setAnswer] = useState(null)
    const [style, setStyle] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    function handleOptionClick(isCorrect) {
        if (answer === null) {
            setAnswer(true);
            try {
                if (isCorrect) {
                    setStyle("success")
                    props.setScore((oldValue) => oldValue + 10)
                    props.setCorrect((oldValue) => oldValue + 1)
                } else {
                    setStyle("danger");
                    setCorrectAnswer((props.questionObj.options.find((obj) => (obj.isCorrect))).optionText);
                    console.log(correctAnswer);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    const options = props.questionObj.options.map((option) => <button onClick={() => handleOptionClick(option.isCorrect)} className="btn btn-primary">{option.optionText}</button>)

    return (
        <div className="d-flex flex-column justify-content-around w-75 m-auto">
            <div className="card w-50 mx-auto mt-4">
                <div className="card-header text-center">
                    Question ID: {props.questionObj.id}
                </div>
                <div className="d-flex flex-column gap-2 p-4 text-center">
                    <h5 className="card-title mb-4">{props.questionObj.questionText}</h5>
                    {options}
                </div>
            </div>
            {answer && <Message style={style} correctAnswer={correctAnswer} />}
        </div>

    )
}

export default QuizCard;