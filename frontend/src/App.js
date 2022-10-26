import Team from "./Team";
import Profile from "./Profile";
import Start from "./Start";
import { Route, Routes} from "react-router-dom";
import Employee from "./Employee";
import {useEffect, useState} from "react";
import {FeedbackHistory} from "./components/FeedbackHistory";
import {FeedbackView} from "./components/FeedbackView";
import {NewFeedBack} from "./components/NewFeedBack";

function App() {
    const [teams, setTeams] = useState([]);
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
    return (
        <>
            <Routes>
                <Route path="/teams" element={<Team teams={teams}/>}/>
                <Route path="/employees" element={<Employee/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/sign" element={<Start/>}/>
                <Route path="/feedbackhistory" element={<FeedbackHistory/>}/>
                <Route path="/feedbackview" element={<FeedbackView/>}/>
                <Route path="/newfeedback" element={<NewFeedBack/>}/>
            </Routes>
        </>

    );
}
export default App;