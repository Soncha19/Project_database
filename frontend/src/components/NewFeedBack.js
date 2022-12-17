import React, {useEffect, useState} from 'react';
import {Stack, TextField, Autocomplete, withStyles} from "@mui/material";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "../CSSFiles/NewFeedback.css";
import "../CSSFiles/Main.css"
import {getToken} from "./UserLog";
import Header from "./Header";

const useStyles = makeStyles({
    option: {
        "&": {
            backgroundColor: "white !important",

        }
    },
    listbox:
        {
            "&": {
                backgroundColor: "white !important"
            }
        },
    input:
        {
            "&": {
                backgroundColor: "white !important",
            }
        },
    inputRoot:
        {
            "&": {
                backgroundColor: "white !important",
            }
        },
    focused:
        {
            "&":
                {
                    color:"black"
                }
        },
    root:
        {
            "&":{
            },
            '& label.Mui-focused': {
                color: 'black',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                },
            },
            '& .MuiInput-underline:after': {
            },
            "&.Mui-focused fieldset": {
            }
        }
});
export const NewFeedBack = (props) =>
{
    class Value
    {
        constructor(text, id)
        {
            this.text = text;
            this.id = id;
        }
    }

    let location = useLocation();
    let idOfEmployee = location.state.idEmployee;
    let id = idOfEmployee;
    const [allInfo, setAllInfo] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [feedbackHistory, setFeedbackHistory] = useState([]);
    const [propertySets, setPropertySets] = useState([]);
    const [question, setQuestion] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [preAnswers, setPreAnswers] = useState([]);

    const [values, setValues] = useState([]);
    const [note, setNote] = useState("");

    const [postedFeedback, setPostedFeedback] = useState([]);
    const [buttonLabel, setButtonLabel] = useState("Send feedback");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const navigate = useNavigate();

    function GetPreAnswers(id)
    {
        let preAnswersArray = [];
        for (let i = 0; i < preAnswers?.length; i++)
        {
            if(preAnswers[i].question_id == id)
            {
                preAnswersArray.push(preAnswers[i].text);
            }
        }
        return preAnswersArray;
    }

    function SetValue(value, id)
    {
        let valueTemp = values;
        valueTemp[id] = new Value(value, id);
        setValues(valueTemp);
        console.log(values)
    }

    function PostFeedback()
    {
        let now = new Date();
        let day = String(now.getDate()).padStart(2, '0');
        let month = String(now.getMonth() + 1).padStart(2, '0');
        let year = now.getFullYear();
        let dateStr = year + "-" + month + "-" + day;
        let feedbackId = -1;
        fetch('http://localhost:8080/feedback', {
            method: 'POST',
            body: JSON.stringify({"employee_id": idOfEmployee,"date_of_creation": dateStr,"note" : note}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${getToken()}`
            },
        })
            .then((response) => response.json())
            .then(response => setPostedFeedback(response))
            .catch((err) => {console.log(err.message);});
    }

    function PostAnswers()
    {
        let answers = []
        for(let i = 0; i < values?.length; i++)
        {
            let preAnswerId = -1;
            for(let j = 0; j < preAnswers?.length; j++)
            {
                if(values[i].text == preAnswers[j].text)
                {
                    preAnswerId = preAnswers[j].id;
                    break;
                }
            }
            let number = values[i].id; //+ 1;
            let currentAns = {"number": number, "pre_answer_id": preAnswerId , "feedback_id" : postedFeedback?.id}
            answers.push(currentAns)
        }
        console.log(answers);
        for (let i in answers)
        {
            fetch('http://localhost:8080/answer', {
                method: 'POST',
                body: JSON.stringify({"number" : answers[i].number, "pre_answer_id": answers[i].pre_answer_id, "feedback_id" : answers[i].feedback_id}),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    Authorization: `Bearer ${getToken()}`
                },
            })
                .then((response) => response.json())
                .then()
                .catch((err) => {console.log(err.message);});
        }
    }

    const redirectToFeedbackHistory = () =>
    {
        setTimeout(() => {
            navigate('/feedbackhistory', {state:{id:{id}}});
            window.location.reload(false);
        },5000)
    }

    function GetInfo()
    {
        useEffect(() => {
            fetch('http://localhost:8080/allFeedbackHistory/?employee_id=' + idOfEmployee.toString(), {
                'methods': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                }
            })
                .then(response => response.json())
                .then((response) => {setAllInfo(response);})
                .catch(error => console.log(error))
        }, [])
    }

    GetInfo();

    useEffect(() => {
        setEmployee(allInfo.employee);
        setFeedbackHistory(allInfo.feedback_history);
        setPropertySets(allInfo.property_set);
        setQuestion(allInfo.questions);
        setFeedbacks(allInfo.feedbacks);
        setAnswer(allInfo.answers);
        setPreAnswers(allInfo.pre_answers);

    },[allInfo]);

    useEffect(()=> {PostAnswers()}, [postedFeedback]);

    useEffect(()=> {
        if(preAnswers?.length > 0 && question?.length > 0 && employee != undefined)
        {
            deleteLoader();
        }
    }, [preAnswers, question, employee]);

    function deleteLoader()
    {
        setTimeout(() => {
            let mask = document.getElementsByClassName('loader-Mask');
            while(mask.length > 0){
                mask[0].parentNode.removeChild(mask[0]);
            }
        }, 600)
    }

    const styles = useStyles();

    return(
        <>
            <div className={"loader-Mask"}>
                <div className={"loader"}></div>
            </div>
<div className={"page"}>
            <Header/>
    <main className={"main"}>
            <div className={"allWrapper"}>
                <div className={"Wrapper"}><div id={"EmployeeInfo"}> <h2 style={{textAlign: "center"}}>New feedback for</h2><h2><p className={"PHyp"}>{employee?.first_name} {employee?.last_name} ({propertySets?.name})</p></h2></div></div>

            <div id={"Questions"}>
                {question?.map((items, index) => {
                    return <div className={"list"}><Autocomplete disablePortal
                                              id={"optionbox"+ items.id}
                                              options={GetPreAnswers(items.id)}
                                              value={values[items.number]}
                                              onChange={(event, newValue) => {
                                                  SetValue(newValue, items.number);
                                              }}
                                              classes={{option: styles.option, listbox: styles.listbox, input: styles.input, inputRoot: styles.option, root: styles.root}}
                                                                 inputProps={{ style: { fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"', color: 'black' } }}
                                              renderInput={(params) => <TextField {...params} label={items.text} />} /></div>;
                })}

                <div className={"list"}><TextField label="Note"
                           onChange={e => setNote(e.target.value)}
                           value={note} style={{width:"100%", height:"20%"}}
                                                   classes={{root: styles.option}}


                />
                </div>
            </div>
                <div id={"AddFeedbackButton"} disabled={buttonDisabled} onClick={function(event){setButtonLabel("Wait");setButtonDisabled(true);PostFeedback();redirectToFeedbackHistory();}}><h2>{buttonLabel}</h2></div>
            </div>
    </main>

</div>
        </>
    )
}