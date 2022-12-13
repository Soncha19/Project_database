import React, {useState} from 'react';
import {getToken} from "./UserLog";

const GetEmployeeInfo = () => {

    // useEffect(() => {
    fetch("http://localhost:8080/employee/findByToken", {
        'methods': 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`
        }
    })
        .then((response) => {
            return response.json().then((data) => {
                console.log(data);
                return data;
            }).catch((err) => {
                console.log(err);
            })
        });
// }, [])


}
;

export default GetEmployeeInfo;