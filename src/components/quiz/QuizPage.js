import QuizCard from './QuizCard';
import { useEffect, useState } from 'react';
import ResultCard from './ResultCard';
import "./QuizPage.css"
import { fetchQuiz } from '../../firebase/fetchQuestionsFromDB';
import { useLocation } from 'react-router-dom';

function QuizPage() {
    const [startQuiz, setStartQuiz] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const { id } = location.state;
        // console.log("id: ", id);
        fetchQuiz(id).then(arr => {
            setQuestions(arr);
            setLoading(false);
        });
        console.log("From Quiz page: ", questions);
        // return () => setQuestions([]);
    }, []);

    const [currentQuestionNo, setCurrentQuestionNo] = useState(0);
    const [isLastQuestion, setIsLastQuestion] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [score, setScore] = useState(0);
    const [correct, setCorrect] = useState(0);

    function handlePrevious() {
        setCurrentQuestionNo((oldValue) => (oldValue === 0) ? oldValue : oldValue - 1);
    }

    function handleSubmit() {
        setIsComplete(true);
    }

    function handleNext() {
        if (currentQuestionNo < questions.length - 1) {
            setCurrentQuestionNo((oldValue) => {
            oldValue = oldValue + 1
            if (oldValue === questions.length - 1) setIsLastQuestion(true);
            return oldValue;
            })
        } else {
            handleSubmit();
        }
    }

    function handleStart() {
        setTimeout(() => setStartQuiz(true), "3000");
        // setStartQuiz(true);
    }

    return (
        <div className="wrapper">
            {!startQuiz && 
            <div className='d-flex flex-column align-center w-50mx-auto mt-5'>
                <h1 className='text-center'>Are you ready for the quiz?</h1>
                <button className='btn btn-primary m-5 w-25 mx-auto' onClick={handleStart}>Start the Quiz</button>
            </div>
            }
            { questions[0]?.options && startQuiz &&
            <div className='d-flex flex-column justify-content-between h-100'>
            {isComplete && <ResultCard score={score} correct={correct} questionNo={currentQuestionNo + 1}/>}
            {!isComplete && <QuizCard key={(questions[currentQuestionNo]).id} 
            questionObj={questions[currentQuestionNo]} 
            score={score}
            setScore={setScore}
            correct={correct}
            setCorrect={setCorrect}
            /> }
            {!isComplete &&
            <div className="d-flex flex-row justify-content-around my-4">
                <button type="button" className="btn btn-outline-light" onClick={handlePrevious}>Previous</button>
                <button type="button" className="btn btn-outline-light" onClick={handleNext}>{isLastQuestion ? "Submit" : "Next"}</button>
            </div>}
            </div>
            }
        </div>
    )
}

export default QuizPage;