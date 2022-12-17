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
import {checkIfIsLoggedIn, getToken, setUser} from "./components/UserLog";
import Footer from "./components/Footer";

function RoutesM() {

    let check = getToken() != '' ? true : false;

    console.log(check)
    return (
        <>
            <div className={"page"}>
                <main className={"main"}>


                    <Routes>


                        {check && <Route path="/teams" element={<Team/>}/>}
                        {check && <Route path="/employees" element={<Employee/>}/>}
                        {check && <Route path="/profile" element={<Profile/>}/>}
                        <Route path="/sign" element={<Start/>}/>
                        {check && <Route path="/addpropertysettoemployee" element={<AddPropertySetToEmployee/>}/>}
                        {check && <Route path="/employeesofthecompany" element={<EmployeesOfTheCompany/>}/>}
                        {check && <Route path="/feedbackhistory" element={<FeedbackHistory/>}/>}
                        {check && <Route path="/feedbackview" element={<FeedbackView/>}/>}
                        {check && <Route path="/newfeedback" element={<NewFeedBack/>}/>}
                        <Route
                            path="*"
                            element={<Navigate to="/sign" replace/>}
                        />

                    </Routes>
                </main>

                <footer>
                    ©Procadi
                </footer>
            </div>
        </>
    );
}

export default RoutesM