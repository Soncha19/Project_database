import React, {useState, useEffect} from 'react';
import {Stack} from "@mui/material";
import {Feedback} from "../Classes/Feedback";
import {PropertySet} from "../Classes/PropertySet";
import {Answer} from "../Classes/Answer";
import {Question} from  "../Classes/Question";
import {FeedbackHistoryClass} from "../Classes/FeedbackHistoryClass";
import {EmployeeNoPassword} from "../Classes/EmployeeNoPassword";
import {Fetch} from "react-request";
import "../CSSFiles/FeedbackHistoryStyles.css";

let employee = new EmployeeNoPassword(0, "Fred", "Fredrenko", "@gmail.com", 0,
    0, 0, "666", "2000-02-20", 0);

let feedbackHistoryClass = new FeedbackHistoryClass(0,0);

let propertySet = new PropertySet(0,"Tester");

let questions = [];
questions.push(new Question(0, 1, "Programming", 0));
questions.push(new Question(0, 2, "Teamwork", 0));
questions.push(new Question(0, 3, "Quickness", 0));

let feedback = [];
feedback.unshift(new Feedback(0, "2022-01-01", 0, "ALl is ok"))
feedback.unshift(new Feedback(1, "2022-02-01", 0, "ALl is bad"))
feedback.unshift(new Feedback(2, "2022-03-01", 0, "ALl is norm"))

let answers = [];
answers.push(new Answer(0,1,"0",0));
answers.push(new Answer(1,2,"0",0));
answers.push(new Answer(2,3,"0",0));

answers.push(new Answer(3,1,"1",1));
answers.push(new Answer(4,2,"1",1));
answers.push(new Answer(5,3,"1",1));

answers.push(new Answer(6,1,"2",2));
answers.push(new Answer(7,2,"2",2));
answers.push(new Answer(8,3,"2",2));

let table = [];
let start = answers.length - 1;
for(let i = 0; i < feedback.length; i++)
{
    let temp = [];
    for (let j = start; j >= start - questions.length + 1; j--)
    {
        temp.unshift(answers[j].text);
    }
    temp.unshift([feedback[i].dateOfCreation]);
    start -= questions.length ;
    table.push(temp);
}

export const FeedbackHistory = (props) =>
{
    useEffect(()=>{
        fetch('/teams',{
            'methods':'GET',
            headers : {
                'Content-Type':'application/json'
            }
        })
            .then(response => response.json())
            .then(response => setTeams(response))
            .catch(error => console.log(error))
    },[])

    const [marks, setMarks] = useState(table);
    return(

        <>

            <h1 id="PageName">Feedback history</h1>
            <p id="EmployeeInfo">{employee.firstName} {employee.lastName} {propertySet.name}</p>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={3}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
                    <div className="Date">Date</div>
                    {questions.map((item, index) =>
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


