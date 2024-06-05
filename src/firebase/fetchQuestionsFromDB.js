import { firestore } from "./firebase";
import { doc, query, getDoc } from "firebase/firestore";
import { collection, getDocs, where } from "firebase/firestore";

export const fetchAllQuizzes = async () => {
    const docs = await getDocs(collection(firestore, 'quizzes'));
    const quizDetails = [];
    docs.forEach((quiz) => {
        const obj = {
            QuizName: quiz.data().QuizName,
            Author: quiz.data().Author,
            Description: quiz.data().Description,
            QuizId: quiz.data().QuizId,
            id: quiz.id
        }
        quizDetails.push(obj);
    })

    return quizDetails;
}

export const fetchQuiz = async (id) => {
    const querySnapshot = await getDocs(collection(firestore, 'quizzes', `${id}`, 'question'));
    const questions = [];
    querySnapshot.forEach((doc) => {
        const question = {
            id: "",
            questionText: "",
            options: []
        }

        if (doc.data().questionText) {
            question.id = doc.id;
            question.questionText = doc.data().questionText;
            getDocs(collection(firestore, 'quizzes', `${id}`, 'question', `${doc.id}`, 'option'))
            .then((options) => {
                
                options.forEach((option) => {
                    const opt = {
                        optionText: "",
                        isCorrect: false
                    }
                    opt.optionText = option.data().optionText;
                    opt.isCorrect = option.data().isCorrect;
                    question.options.push(opt);
                })
            })
            questions.push(question);
        }
    })
    console.log("from fetch: ", questions);
    return questions;
}

export const fetchUser = async (email) => {
    const q = query(collection(firestore, "users"), where('email', '==', email));
    let res = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log("fetchUser: ", doc.data().quizzes);
        res = doc.data().quizzes;
    })
    return res;
}

export const fetchMyQuizzes = async (QuizIds) => {
    console.log("Inside fetchMyQuizzes: ", QuizIds);
    const quizDetails = [];
    for (let i = 0; i < QuizIds.length; i++) {
        const ref = doc(firestore, 'quizzes', `${QuizIds[i]}`);
        const quiz = await getDoc(ref);
        if (!(quiz.data())) continue;
        const obj = {
            QuizName: quiz.data().QuizName,
            Author: quiz.data().Author,
            Description: quiz.data().Description,
            QuizId: quiz.data().QuizId,
            id: quiz.id
        }
        quizDetails.push(obj);
    }
    return quizDetails;
}