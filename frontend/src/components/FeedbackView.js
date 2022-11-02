import React, {useState} from 'react';
import {Stack} from "@mui/material";
import {Feedback} from "../Classes/Feedback";
import {Question} from "../Classes/Question";


export const FeedbackView = (props) =>
{
    let feed = new Feedback("01/01/2022");
    feed.addMark(new Question("Property1", "5-stars", "4", true));
    feed.addMark(new Question("Property2", "Yes/No", "0", false));

    return(
        <>


            <Stack>
                {feed.marks.map(mark =>
                    <div>{mark.name} - {mark.rate}</div>
                )
                }
                <div>Note: {feed.note}</div>
            </Stack>
        </>
    );
}
