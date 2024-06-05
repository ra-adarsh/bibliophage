import './NewQuiz.css'
import { useState } from "react";
import { generateQuestions } from '../../gemini-api/generative-ai';
import axios from "axios";
import { writeData } from "../../firebase/addQuestionsToDB";
import { Navigate } from 'react-router-dom';

function NewQuiz() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [description, setDescription] = useState("");
    const [quizTitle, setQuizTitle] = useState("");
    const [generated, setGenerated] = useState(false);

    function handleSubmit(event) {
        setIsSubmitting(true);
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', uploadFile);
        axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${process.env.REACT_APP_IMGBB_API_KEY}`, formData)
            .then((res) => {
                axios.get(`https://api.ocr.space/parse/imageurl?apikey=${process.env.REACT_APP_OCR_API_KEY}&url=${res.data.data.url}`)
                    .then((resp) => {
                        generateQuestions((resp.data.ParsedResults)[0].ParsedText).then((result) => {
                            writeData({ questionArray: result, Description: description, QuizName: quizTitle }).then((f) => {
                                setGenerated(f);
                            })
                        }).catch((err) => {
                            setErrorMsg(JSON.stringify(err.message));
                        })
                    })
                    .catch((err) => {
                        setErrorMsg(JSON.stringify(err.message));
                    });
            })
            .catch((err) => {
                setErrorMsg(JSON.stringify(err.message))
            }
            );
    }

    function handleChange(event) {
        setUploadFile(event.target.files[0]);
    }

    return (
        <div>
            {generated && <Navigate to="/users/myquizzes" />}
            <div className="mb-3 width-form mx-auto mt-5">
                <h1 className="text-center">Now Create your own quiz by uploading a file here!</h1>
            </div>
            {errorMsg && <div className="alert alert-danger w-25 mx-auto" role="alert">
                {errorMsg}
            </div>}
            <div className="mb-3 width-form mx-auto mt-5">
                <label htmlFor="formFile" className="form-label">Upload the document containing the text below</label>
                <form onSubmit={handleSubmit}>
                    <input className="form-control" type="file" id="formFile" onChange={handleChange} required/>
                    <p className="font-weight-normal mt-2">(Allowed file types: .png, .jpg)</p>
                    <div className="form-group my-3">
                        <label htmlFor="quizName">Quiz Title</label>
                        <input type="text"
                            className="form-control"
                            id="quizName"
                            value={quizTitle}
                            onChange={(e) => setQuizTitle(e.target.value)}
                            placeholder="Give a title..." 
                            required/>
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="description">Description</label>
                        <input type="text"
                            className="form-control"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write a small description..." 
                            required/>
                    </div>
                    <button className="btn btn-primary mt-2">
                        {isSubmitting && <span className="spinner-border spinner-border-sm me-2"></span>}
                        Make a Quiz!
                    </button>
                </form>
                <p className="my-3 px-4 mx-auto text-center">
                    Generating the quiz may take a while. Once, your quiz
                    is generated you will be redirected to My Quizzes page,
                    hit refresh to find your Quiz.
                </p>
            </div>
        </div>
    )
}

export default NewQuiz;