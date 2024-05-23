import { useEffect, useState } from "react";
import { fetchMyQuizzes, fetchQuiz, fetchUser } from "../../firebase/fetchQuestionsFromDB";
import QuizDisplayCard from "./QuizDisplayCard";
import { auth } from "../../firebase/firebase";

function MyQuizzes() {
    const [quizDisplayElements, setQuizDisplayElements] = useState([]);
    useEffect(() => {
        fetchUser(localStorage.getItem("isAuthenticated")).then((res) => {
            // console.log("Inside", res);
            fetchMyQuizzes(res)
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
            // console.log("After");
        })
        // console.log(quizDisplayElements);
        return () => setQuizDisplayElements([]);
    }, []);

    return (
        <div className="d-flex flex-row flex-wrap mt-3 w-75 mx-auto">
            {quizDisplayElements}
            {/* {<button className="btn btn-primary" onClick={() => fetchUser(auth.currentUser.email)}>Get data</button>} */}
        </div>
    )
}

export default MyQuizzes;