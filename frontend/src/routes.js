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
import {checkIfIsLoggedIn, setUser} from "./components/UserLog";

function RoutesM() {

    let check = 1;

        // checkIfIsLoggedIn();
    return (
        <Routes>
              <Route path="/teams" element={<Team/>}/>
           { check && <Route path="/employees" element={<Employee/>}/>}
          { check &&  <Route path="/profile" element={<Profile/>}/>}
            <Route path="/sign" element={<Start/>}/>
           { check && <Route path="/addpropertysettoemployee" element={<AddPropertySetToEmployee/>}/>}
          { check &&  <Route path="/employeesofthecompany" element={<EmployeesOfTheCompany/>}/>}
           { check && <Route path="/feedbackhistory" element={<FeedbackHistory/>}/>}
           { check && <Route path="/feedbackview" element={<FeedbackView/>}/>}
           { check && <Route path="/newfeedback" element={<NewFeedBack/>}/>}
            <Route
                path="*"
                element={<Navigate to="/sign" replace/>}
            />

        </Routes>

    );
}

export default RoutesM