import './App.css';
import { useState } from 'react';
import NavBar from './components/home/NavBar';
import NewQuiz from './components/quiz/NewQuiz';
import Signin from './components/login/Signin';
import Login from './components/login/Login';
import QuizPage from './components/quiz/QuizPage';
import Home from './components/home/Home';
import About from './components/home/About';
import { Navigate, Route, Routes } from "react-router-dom";
import Quizzes from './components/quiz/Quizzes';
import { AuthContext } from './contexts/authContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import AllQuizzes from './components/quiz/AllQuizzes';
import MyQuizzes from './components/quiz/MyQuizzes';

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const value = { 
    currentUser, 
    setCurrentUser, 
    userLoggedIn, 
    setUserLoggedIn,
    authenticated,
    setAuthenticated
  };

  onAuthStateChanged(auth, (user) => {
  if (user) {
      value.setCurrentUser(user);
      value.setAuthenticated(true);
  } else {
      value.setCurrentUser(null);
      value.setAuthenticated(false);
  }
  });


  return (
    <AuthContext.Provider value={value}>
      <div className='app-wrapper'>
        <Routes>
          <Route exact path='/' element={<><NavBar/><Home /></>}/>
          <Route exact path='/about' element={<><NavBar/><About /></>}/>
          <Route exact path='/users' element={<NavBar />}>
            <Route path='login' element={<Login />}/>
            <Route path='signin' element={<Signin />}/>
            <Route path='quizzes' element={localStorage.getItem("isAuthenticated") ? <AllQuizzes /> : <Navigate to="/users/login" />}/>
            <Route path='newquiz' element={localStorage.getItem("isAuthenticated") ? <NewQuiz /> : <Navigate to="/users/login" />}/>
            <Route path='quiz' element={localStorage.getItem("isAuthenticated") ? <QuizPage /> : <Navigate to="/users/login" />}/>
            <Route path='myquizzes' element={localStorage.getItem("isAuthenticated") ? <MyQuizzes /> : <Navigate to="/users/login" />}/>
            <Route path='newquiz' element={localStorage.getItem("isAuthenticated") ? <NewQuiz /> : <Navigate to="/users/login" />}/>
            {/* <Route path='quiz' element={<QuizPage />} />
            <Route path='myquizzes' element={<MyQuizzes />} /> */}
          </Route>
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
