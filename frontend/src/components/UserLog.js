import React, {useEffect, useState} from 'react';

// export function GetEmployee() {
//     return fetch("http://localhost:8080/employee/findByToken", {
//         'methods': 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${getToken()}`
//         }
//     })
//         .then((response) => response.json())
//         .then((responseData) => {
//             console.log(responseData);
//             return responseData;
//         })
//         .catch(error => console.warn(error));
// };
//
// export function GetEmp() {
//     GetEmployee().then(response => console.log(response));
//
// }

export const getToken = () => {
    if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem("token");
        if (saved) {
            const initialValue = JSON.parse(saved);
            console.log(initialValue)
            return initialValue;
            // console.log(saved)
            // return saved
        } else {
            return ''
        }

    }
}


export const getUser = () => {
    if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem("company_id");
        const initialValue = JSON.parse(saved);
        console.log(initialValue.company_id)
        return initialValue.company_id;
    }
}

export function setToken(token) {

    if (typeof localStorage !== 'undefined') {
        localStorage.setItem("token", JSON.stringify(token));


    }
}

export function setUser(user) {
    if (typeof localStorage !== 'undefined') {
        console.log(user.token)
        localStorage.setItem("token", JSON.stringify(user.token));
        localStorage.setItem("id", JSON.stringify(user.id));
        localStorage.setItem("first_name", JSON.stringify(user.first_name));
        localStorage.setItem("last_name", JSON.stringify(user.last_name));
        localStorage.setItem("email", JSON.stringify(user.email));
        localStorage.setItem("team_id", JSON.stringify(user.team_id));
        localStorage.setItem("company_id", JSON.stringify(user.company_id));
        localStorage.setItem("is_owner", JSON.stringify(user.is_owner));
        localStorage.setItem("password", JSON.stringify(user.password));
        localStorage.setItem("phone", JSON.stringify(user.phone));
        localStorage.setItem("role", JSON.stringify(user.role));

    }
}


export function removeToken() {
    if (typeof localStorage !== 'undefined') {
        return localStorage.removeItem("token");
    }
}

export function checkIfIsLoggedIn() {
    const token = getToken();

    if (!token) {
        return false;
    }
    return true;
}

// export function getEmpFirstName() {
//     return employee?.first_name
// };
//
// export function getEmpLastName() {
//     return employee?.last_name
// };
//
// export function getEmpPhone() {
//     return employee?.phone
// };
//
// export function getEmpEmail() {
//     return employee?.email
// };

export const getEmpCompanyId = () => {
    if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem("company_id");
        return saved;
    }
};

// export function getEmpTeamId() {
//     // let employee = GetEmployee();
//     return user?.team_id
// };

export function getEmpId() {
    if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem("id");
        return saved;
    }
};

// export function getEmpIsOwner() {
//     // let employee = GetEmployee();
//     return user?.is_owner
// };
// export function getEmpRole() {
//     // let employee = GetEmployee();
//     return user?.role;
// };