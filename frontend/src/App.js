import Team from "./components/Team";
import Profile from "./components/Profile";
import Start from "./components/Start";
import { Route, Routes} from "react-router-dom";
import Employee from "./components/Employee";
import {useEffect, useState} from "react";
import {FeedbackHistory} from "./components/FeedbackHistory";
import {FeedbackView} from "./components/FeedbackView";
import {NewFeedBack} from "./components/NewFeedBack";
import AddPropertySetToEmployee from "./components/AddPropertySetToEmployee";
import EmployeesOfTheCompany from "./components/EmployeesOfTheCompany";


function App() {
    return (
        <>
            <Routes>
                <Route path="/teams" element={<Team/>}/>
                <Route path="/employees" element={<Employee/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/sign" element={<Start/>}/>
                <Route path="/addpropertysettoemployee" element={<AddPropertySetToEmployee/>}/>
                <Route path="/employeesofthecompany" element={<EmployeesOfTheCompany/>}/>
                <Route path="/feedbackhistory" element={<FeedbackHistory/>}/>
                <Route path="/feedbackview" element={<FeedbackView/>}/>
                <Route path="/newfeedback" element={<NewFeedBack/>}/>
            </Routes>
        </>

    );
}
export default App;