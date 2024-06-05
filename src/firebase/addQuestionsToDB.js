import { auth, firestore } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { updateQuizInUser } from "./registerUser";

export const writeData = async (obj) => {
    const { questionArray, Description, QuizName } = obj;
    const res = await addDoc(collection(firestore, "quizzes"), {
        QuizId : `${auth.currentUser.uid + Date.now()}`,
        Author: `${auth.currentUser.displayName}`,
        Description: `${Description}`,
        QuizName: `${QuizName}`
    })

    updateQuizInUser({email: auth.currentUser.email, quizId: res.id});

    questionArray.forEach((question) => {
        addDoc(collection(firestore, `quizzes/${res.id}/question`), {
            questionText: question.questionText,
        }).then((ques) => {
            question.options.forEach((option) => {
                addDoc(collection(firestore, `quizzes/${res.id}/question/${ques.id}/option`), {
                    optionText: option.optionText,
                    isCorrect: option.isCorrect
                })
            })
        })
    })
    
    return true;
}