import { firestore } from "./firebase";
import { doc, query, addDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { collection, getDocs, where } from "firebase/firestore";

export const addUser = async (user) => {
    addDoc(collection(firestore, 'users'), {
        email : user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        quizzes: []
    })
}

export const getId = async (email) => {
    const q = query(collection(firestore, "users"), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    let res = null;
    querySnapshot.forEach((doc) => {
        console.log("fetchUser: ", doc.id);
        res = doc.id;
    })
    return res;
}

export const updateQuizInUser = async (details) => {
    const { email, quizId } = details;
    const userId = await getId(email);
    const userRef = doc(firestore, 'users', `${userId}`);
    await updateDoc(userRef, {
        quizzes: arrayUnion(`${quizId}`)
    });
}