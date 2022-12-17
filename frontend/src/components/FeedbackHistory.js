import React, {useState, useEffect} from 'react';
import {Stack} from "@mui/material";
import "../CSSFiles/FeedbackHistoryStyles.css";
import {Link, useLocation} from "react-router-dom";
import {getToken} from "./UserLog";
import Header from "./Header";

export const FeedbackHistory = (props) => {
    class Mark {
        constructor(feedbackId, date, length) {
            this.feedbackId = feedbackId;
            this.date = date;
            this.marks = new Array();
            this.marksColours = new Array();
            this.changeMarks = new Array();
            this.currentAnswer = new Array();
        }

        AddMark(mark, position) {
            this.marks[position] = mark;
        }

        AddColor(mark, position) {
            this.marksColours[position] = mark;
        }

        AddChangeMark(mark, position) {
            this.changeMarks[position] = mark;
        }

        AddCurrnetAnswer(answer, position) {
            this.currentAnswer[position] = answer;
        }
    }

    let location = useLocation();
    let idOfEmployee = location.state.id.id;
    if (idOfEmployee == undefined) {
        idOfEmployee = location.state.id.idOfEmployee;
    }

    const [allInfo, setAllInfo] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [propertySets, setPropertySets] = useState([]);
    const [question, setQuestion] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [marks, setMarks] = useState([]);
    const [preAnswer, setPreAnswer] = useState([]);

    const [widthSize, setWidthSize] = useState('0%');

    function GetTable() {
        let marks = []

        for (let feedbackIndex = 0; feedbackIndex < feedback?.length; feedbackIndex++) {
            let feedbackId = feedback[feedbackIndex].id;
            let mark = new Mark(feedbackId, feedback[feedbackIndex].date_of_creation, question?.length)

            for (let answerIndex = 0; answerIndex < answer?.length; answerIndex++) {
                let ans = answer[answerIndex];
                if (ans.feedback_id == feedbackId) {

                    let currentPreAnswer = 0;
                    for (let i = 0; i < preAnswer?.length; i++) {
                        if (preAnswer[i].id == ans.pre_answer_id) {
                            currentPreAnswer = preAnswer[i].numeric_value;
                            mark.AddCurrnetAnswer(preAnswer[i].text, ans.number);
                            break;
                        }
                    }

                    mark.AddMark(currentPreAnswer, ans.number)
                    if (feedbackIndex != 0) {
                        if (marks[feedbackIndex - 1].marks[ans.number] < currentPreAnswer) {
                            let plus = "+";
                            let change = (currentPreAnswer - marks[feedbackIndex - 1].marks[ans.number]).toString();
                            let result = plus.concat(change);

                            mark.AddColor('GreenMark', ans.number);
                            mark.AddChangeMark(result, ans.number);
                        } else if (marks[feedbackIndex - 1].marks[ans.number] == currentPreAnswer) {
                            mark.AddChangeMark((currentPreAnswer - marks[feedbackIndex - 1].marks[ans.number]).toString(), ans.number);
                            mark.AddColor('GreyMark', ans.number);
                        } else {
                            mark.AddChangeMark(currentPreAnswer - marks[feedbackIndex - 1].marks[ans.number], ans.number);
                            mark.AddColor('RedMark', ans.number);
                        }

                    } else {
                        if (0 < currentPreAnswer) {
                            let plus = "+";
                            let change = (currentPreAnswer).toString();
                            let result = plus.concat(change);

                            mark.AddColor('GreenMark', ans.number);
                            mark.AddChangeMark(result, ans.number);
                        } else if (0 == currentPreAnswer) {
                            mark.AddChangeMark((0).toString(), ans.number);
                            mark.AddColor('GreyMark', ans.number);
                        } else {
                            mark.AddChangeMark(currentPreAnswer, ans.number);
                            mark.AddColor('RedMark', ans.number);
                        }
                        /*
                        mark.AddColor('GreyMark', ans.number);
                        mark.AddChangeMark( currentPreAnswer, ans.number);
                         */
                    }
                }
            }
            marks.push(mark);
        }
        marks = marks.reverse();
        setWidthSize((100 / (question?.length + 1)).toString() + '%');
        return marks;
    }

    function GetInfo() {
        useEffect(() => {
            fetch('http://localhost:8080/allFeedbackHistory/?employee_id=' + idOfEmployee.toString(), {
                'methods': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                }
            })
                .then(response => response.json())
                .then((response) => {
                    setAllInfo(response);
                    deleteLoader()
                })
                .catch(error => console.log(error))
        }, [])
    }

    GetInfo();

    useEffect(() => {
        setEmployee(allInfo.employee);
        setPropertySets(allInfo.property_set);
        setQuestion(allInfo.questions);
        setFeedback(allInfo.feedbacks);
        setAnswer(allInfo.answers);
        setPreAnswer(allInfo.pre_answers);
        console.log(allInfo);
    }, [allInfo]);

    useEffect(() => {
        setMarks(GetTable());
    }, [answer]);

    function deleteLoader() {
        setTimeout(() => {
            let mask = document.getElementsByClassName('loader-Mask');
            while (mask.length > 0) {
                mask[0].parentNode.removeChild(mask[0]);
            }
        }, 600)
    }

    return (

        <>
            <div className={"loader-Mask"}>
                <div className={"loader"}></div>
            </div>
            <div className={"page"}>
                <Header/>
                <main className={"main"}>
                    <div className={"allMaks"}>
                        <div id={"Wrapper-PIB-Button"}>
                            <div className={"EmployeeInfo"}>
                                <h2>{employee?.first_name} {employee?.last_name}, {propertySets?.name}</h2>
                            </div>

                            <Link className={"linkToNew"} to="/newfeedback"
                                  state={{idEmployee: idOfEmployee, propertySetId: propertySets?.id}}
                                  style={{textDecoration: 'none'}}>
                                <div className={"AddFeedbackInfo"}>
                                    <h2>New feedback</h2>
                                </div>
                            </Link>
                        </div>


                        <div class="mark-date">
                            <div className="date" style={{width: widthSize}}>Date</div>
                            {question?.map((item, index) =>
                                <div className={"component-question"} style={{width: widthSize}}>
                                    <div className={/*"GreyMark"*/"QuestionsName"}>{item?.text}</div>
                                </div>
                            )
                            }
                        </div>

                        {marks?.map((items, index) => {
                            return (
                                <Link to="/feedbackview" state={{
                                    idFeedback: items.feedbackId,
                                    idEmployee: idOfEmployee,
                                    propertySetId: propertySets.id
                                }} style={{textDecoration: 'none'}}>
                                    <div class="mark">
                                        <div class="date" style={{width: widthSize}}>{items.date}</div>

                                        {
                                            items.changeMarks.map((subItems, sIndex) => {
                                                return <div className="component"
                                                            data-tooltip={items.currentAnswer[sIndex]}
                                                            style={{width: widthSize}}>
                                                    <div class={items.marksColours[sIndex]}>{subItems}</div>
                                                </div>;
                                            })}

                                    </div>
                                </Link>
                            );
                        })}

                    </div>
                </main>

            </div>
        </>
    )

}


