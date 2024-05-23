import { GoogleAuthProvider } from "firebase/auth/cordova";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, updatePassword, sendPasswordResetEmail } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    localStorage.setItem("isAuthenticated", `${email}`);
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const doLoginInWithEmailAndPassword = async (email, password) => {
    localStorage.setItem("isAuthenticated", `${email}`);
    return await signInWithEmailAndPassword(auth, email, password)
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
};

export const doSignOut = async () => {
    localStorage.clear();
    return await auth.signOut();
};

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
    return updatePassword(auth.provider, password);
};

export const deSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    });
};
