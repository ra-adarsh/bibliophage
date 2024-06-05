import { useEffect, useState } from "react";
import { fetchMyQuizzes, fetchUser } from "../../firebase/fetchQuestionsFromDB";
import QuizDisplayCard from "./QuizDisplayCard";

function MyQuizzes() {
    const [loadingQuizzes, setLoadingQuizzes] = useState(true);
    const [quizDisplayElements, setQuizDisplayElements] = useState([]);
    useEffect(() => {
        fetchUser(localStorage.getItem("isAuthenticated")).then((res) => {
            fetchMyQuizzes(res)
                .then((quizDetails) => {
                    console.log(quizDetails.length);
                    quizDetails.forEach((quiz) => {
                        setQuizDisplayElements((oldArray) => {
                            const arr = [...oldArray];
                            arr.push(<QuizDisplayCard key={quiz.QuizId} Quiz={quiz} />);
                            return arr;
                        })
                    })
                    setLoadingQuizzes(false);
                })
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

export default MyQuizzes;