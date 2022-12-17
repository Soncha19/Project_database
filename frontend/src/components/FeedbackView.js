import React, {useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import "../CSSFiles/Main.css";
import {useLocation, useNavigate, Link} from "react-router-dom";
import "../CSSFiles/FeedbackView.css";
import {getToken} from "./UserLog";
import Header from "./Header";


export const FeedbackView = (props) =>
{
    class Row
    {
        constructor(question, answer)
        {
            this.question = question;
            this.answer = answer;
        }
    }

    let location = useLocation();
    let id = location.state.idEmployee;
    let idOfCurrentFeedback = location.state.idFeedback;
    const [allInfo, setAllInfo] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [feedbackHistory, setFeedbackHistory] = useState([]);
    const [propertySets, setPropertySets] = useState([]);
    const [question, setQuestion] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentFeedback, setCurrentFeedback] = useState();
    const [answer, setAnswer] = useState([]);
    const [table, setTable] = useState([]);

    const [buttonDisabled, setButtonDisabled] = useState(false);
    function GetInfo()
    {
        useEffect(() => {
            fetch('http://localhost:8080/allFeedbackHistory/?employee_id=' + id.toString(), {
                'methods': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                }
            })
                .then(response => response.json())
                .then((response) => {setAllInfo(response); })
                .catch(error => console.log(error))
        }, [])
    }

    function GetTable(currentQuestion, currentAnswer, currentPreAnswers)
    {
        let rows = [];
        for(let i = 0; i < currentQuestion?.length; i++)
        {
            for(let j = 0; j < currentAnswer?.length; j++)
            {
                if(currentQuestion[i].number-1 == currentAnswer[j].number-1)
                {
                    for (let k = 0; k < currentPreAnswers?.length; k++) {
                        if (currentAnswer[j].pre_answer_id == currentPreAnswers[k].id) {
                            rows[currentQuestion[i].number] = new Row(currentQuestion[i].text, currentPreAnswers[k].text);
                            break
                        }
                    }
                    break
                }
            }
        }
        console.log(rows);
        setTable(rows);
    }

    async function DeleteFeedback()
    {
        console.log("deleting", idOfCurrentFeedback);
            // fetch('http://localhost:8080/feedback/?feedback_id=' + idOfCurrentFeedback.toString(), {
            //     'methods': 'DELETE',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Authorization: `Bearer ${getToken()}`
            //     }
            // }).then()
        await fetch('http://localhost:8080/feedback/?feedback_id=' + idOfCurrentFeedback.toString(), { method: 'DELETE', headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
            }});
        console.log("deleted");
    }

    const navigate = useNavigate();
    const redirectToFeedbackHistory = () =>
    {
        setTimeout(() => {
            navigate('/feedbackhistory', {state:{id:{id}}});
            window.location.reload(false);
        },3000)
    }

    GetInfo();

    useEffect(() => {
        setEmployee(allInfo.employee);
        setFeedbackHistory(allInfo.feedback_history);
        setPropertySets(allInfo.property_set);
        setQuestion(allInfo.questions);
        setFeedbacks(allInfo.feedbacks);

        for(let i = 0; i < feedbacks?.length; i++)
        {
            if(feedbacks[i].id == idOfCurrentFeedback)
            {
                setCurrentFeedback(feedbacks[i]);
                break;
            }
        }

        let ans = [];
        for(let i = 0; i < allInfo.answers?.length; i++)
        {
            if(allInfo.answers[i].feedback_id == idOfCurrentFeedback)
            {
                ans[allInfo.answers[i].number] = allInfo.answers[i];
            }
        }

        setAnswer(ans);
        GetTable(allInfo.questions, allInfo.answers, allInfo.pre_answers);
        console.log(allInfo);
    },[allInfo]);

    useEffect(() => {
        if (table.length > 0 && currentFeedback != undefined) {
            deleteLoader();
        }
    }, [table, currentFeedback])

    function deleteLoader()
    {
        setTimeout(() => {
            let mask = document.getElementsByClassName('loader-Mask');
            while(mask.length > 0){
                mask[0].parentNode.removeChild(mask[0]);
            }
        }, 600)
    }

    return(
        <>
            <div className={"loader-Mask"}>
                <div className={"loader"}></div>
            </div>
            <div className={"page"}>
            <Header/>
                <main className={"main"}>
        <div className={"AllWrapper"}>

            <div className={"WrapperFeedbackView"}>
            <div className={"EmployeeInfoFeedbackView"}><h2>{employee?.first_name} {employee?.last_name}, {propertySets?.name}</h2></div>
                <div id={"DateInfo"}><h2>Date: {currentFeedback?.date_of_creation}</h2></div>
            </div>


            <div className={"feedbackWrapper"}>
                <div className="feedbackMark"> <div className="feedbackMarkComponentQuestion"><h4>Question</h4></div>
                <div className="feedbackMarkComponentAnswer"><h4>Answer</h4></div>
            </div>
            </div>

            {table?.map((items, index) => {
                return <div className={"feedbackWrapper"}><div className="feedbackMark"> <div className="feedbackMarkComponentQuestion"><h4>{items.question}</h4></div>
                <div className="feedbackMarkComponentAnswer"><div className={"QuestionAndMarkText"}>{items.answer}</div></div>
                </div></div>
            })}


            <div id={"Note"}>
                <div className={"NameBackground"}>
                <h2 className={"NoteName"}>Note</h2>
                </div>
                <div className={"DivText"}>
                <h4 className={"NoteText"}>{currentFeedback?.note}</h4>
                </div>
            </div>

            <div className={"buttonInfoDeleteWrapper"}>
                <div disabled={buttonDisabled} onClick={function (event){setButtonDisabled(true); DeleteFeedback(); redirectToFeedbackHistory()}} className={"buttonInfoDelete"}><h3>Delete this feedback</h3></div>
            </div>

            </div>
                </main>

            </div>
        </>
    );
}
