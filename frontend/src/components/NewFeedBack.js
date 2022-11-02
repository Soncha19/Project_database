import React, {useState} from 'react';
import {Stack,TextField} from "@mui/material";
import {Feedback} from "../Classes/Feedback";
import {Question} from "../Classes/Question";

export const NewFeedBack = (props) =>
{
    return(
        <>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={3}>
            <div>Property1 - <TextField /></div>
            <div>Property2 - <TextField /></div>
            <div>Property3 - <TextField /></div>
            <div><TextField /></div>
        </Stack>
        <button>Save</button>
        </>
    )
}