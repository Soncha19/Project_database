import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Team from "./components/Team";
import Employee from "./components/Employee";
import Profile from "./components/Profile";
import Start from "./components/Start";
import AddPropertySetToEmployee from "./components/AddPropertySetToEmployee";
import EmployeesOfTheCompany from "./components/EmployeesOfTheCompany";
import {FeedbackHistory} from "./components/FeedbackHistory";
import {FeedbackView} from "./components/FeedbackView";
import {NewFeedBack} from "./components/NewFeedBack";

function RoutesM() {
    let i = 0;
    return (
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
            <Route
                path="*"
                element={<Navigate to="/sign" replace/>}
            />

        </Routes>

    );
}

export default RoutesM