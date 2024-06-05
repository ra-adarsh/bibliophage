import { useEffect, useState } from "react";
import { fetchAllQuizzes } from "../../firebase/fetchQuestionsFromDB";
import QuizDisplayCard from "./QuizDisplayCard";

function AllQuizzes() {
    const [loadingQuizzes, setLoadingQuizzes] = useState(true);
    const [quizDisplayElements, setQuizDisplayElements] = useState(null);
    useEffect(() => {
        setQuizDisplayElements([]);
        fetchAllQuizzes()
            .then((quizDetails) => {
                quizDetails.forEach((quiz) => {
                    setQuizDisplayElements((oldArray) => {
                        const arr = [...oldArray];
                        arr.push(<QuizDisplayCard key={quiz.QuizId} Quiz={quiz} />);
                        return arr;
                    })
                })
                setLoadingQuizzes(false);
            })
        return () => setQuizDisplayElements([]);
    }, []);

    return (
        <>
            {loadingQuizzes &&
                <div class="d-flex justify-content-center mt-5">
                    <div class="spinner-border" role="status">
                    </div>
                </div>
            }
            <div className="d-flex flex-row flex-wrap mt-3 w-75 mx-auto">
                {quizDisplayElements}
            </div>
        </>
    )
}

export default AllQuizzes;