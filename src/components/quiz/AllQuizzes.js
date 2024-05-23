import { useEffect, useState } from "react";
import { fetchAllQuizzes, fetchQuiz } from "../../firebase/fetchQuestionsFromDB";
import QuizDisplayCard from "./QuizDisplayCard";

function AllQuizzes() {
    const [quizDisplayElements, setQuizDisplayElements] = useState(null);
    useEffect(() => {
        console.log("useEffect triggered")
        setQuizDisplayElements([]);
        fetchAllQuizzes()
        .then((quizDetails) => {
            console.log(quizDetails.length);
            quizDetails.forEach((quiz) => {
                console.log("Processing");
                setQuizDisplayElements((oldArray) => {
                    const arr = [ ...oldArray ];
                    arr.push(<QuizDisplayCard key={quiz.QuizId} Quiz={quiz}/>);
                    return arr;
                })
            })
        })
        // console.log(quizDisplayElements);
        return () => setQuizDisplayElements([]);
    }, []);

    return (
        <div className="d-flex flex-row flex-wrap mt-3 w-75 mx-auto">
            {quizDisplayElements}
            {/* <button className="btn btn-primary" onClick={() => fetchQuiz("SRciU6FzsaT6W4MdEtlo")}>Get data</button> */}
        </div>
    )
}

export default AllQuizzes;