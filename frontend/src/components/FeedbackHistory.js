import React, {useState, useEffect} from 'react';
import {Stack} from "@mui/material";
import {EmployeeNoPassword} from "../Classes/EmployeeNoPassword";
import "../CSSFiles/FeedbackHistoryStyles.css";

let employee = new EmployeeNoPassword(0, "Fred", "Fredrenko", "@gmail.com", 0,
    0, 0, "666", "2000-02-20", 0);

export const FeedbackHistory = (props) =>
{
    const [feedbackHistory, setFeedbackHistory] = useState();
    const [propertySets, setPropertySets] = useState(new Object());
    const [question, setQuestion] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [marks, setMarks] = useState([]);
    const [answer, setAnswer] = useState([]);

    function GetFeedbackHistory() {
        useEffect(() => {
            fetch('http://localhost:8080/property_set/?property_set_id=1', {
                'methods': 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(response => setFeedbackHistory(response))
                .catch(error => console.log(error))
        }, [])
    }

    function GetPropertySets() {
        useEffect(() => {
            fetch('http://localhost:8080/property_set/?property_set_id=1', {
                'methods': 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(response => setPropertySets(response))
                .catch(error => console.log(error))
        }, [])
    }

    function GetQuestion() {
        useEffect(() => {
            fetch('http://localhost:8080/question/?property_set_id=1', {
                'methods': 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(response => setQuestion(response))
                .catch(error => console.log(error))
        }, [])
    }

    function GetFeedbacks() {
        useEffect(() => {
            fetch('http://localhost:8080/feedback/?employee_id=1', {
                'methods': 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(response => setFeedback(response))
                .catch(error => console.log(error))
        }, [])
    }

    function GetAnswers() {
        useEffect(() => {
            fetch('http://localhost:8080/answer/?feedback_id=1', {
                'methods': 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(response => setAnswer(response))
                .catch(error => console.log(error))
        }, [])
    }

    function GetTable()
    {
        let table = [];
        let start = answer?.length - 1;
        for (let i = 0; i < feedback?.length; i++) {
            let temp = [];
            for (let j = start; j >= start - question.length + 1; j--) {
                temp.unshift(answer[j]?.text);
            }
            temp.unshift([feedback[i]?.date_of_creation]);
            start -= question.length;
            table.push(temp);
        }
        return table;
    }

    GetFeedbackHistory();
    GetPropertySets();
    GetQuestion();
    GetFeedbacks();
    GetAnswers();
    useEffect(() => {
        setMarks(GetTable());
    },[question, feedback, answer]);

    return(

        <>
            <h1 id="PageName">Feedback history</h1>
            <p id="EmployeeInfo">{propertySets[0]?.name}: {employee.firstName} {employee.lastName}</p>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={3}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
                    <div className="Date">Date</div>
                    {question.map((item, index) =>
                        <div className="feedback">{item.number}</div>
                    )
                    }
                </Stack>

                    {marks.map((items, index) => {
                        return (
                            <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
                                {items.map((subItems, sIndex) => {
                                    return <div>{subItems}</div>;
                                })}
                            </Stack>
                        );
                    })}
            </Stack>
        </>
    )
}


