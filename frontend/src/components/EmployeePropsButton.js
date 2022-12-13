import React, {useEffect, useState} from 'react';
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {getToken} from "./UserLog";

const EmployeePropsButton = (props) => {
            const [anchorEl, setAnchorEl] = useState(null);
        const [dialogDel, setDialogDel] = useState(null);

        const open = Boolean(anchorEl);
        const openDialogDel = Boolean(dialogDel);

        let teamId = props.props.teamId.teamId
        let employeeId = props.props.id.id


        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClickTeamDel = (event) => {
            setDialogDel(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
            setDialogDel(null);
        };

        const handleDeleteEmployee = () => {
            setDialogDel(null);

            const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                team_id: 1
            })
        };
        fetch('http://localhost:8080/employee/?employee_id=' + employeeId.toString(), requestOptions)
            .then(response => response.json());
        };
        window.location.reload(false);

    return (
        <div>
                <IconButton
                    aria-label="more"
                    id="long-buttonn"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClickTeamDel}
                >
                    <DeleteTwoToneIcon/>
                </IconButton>
                <Dialog open={openDialogDel} onClose={handleClose}>
                    <DialogTitle>Delete this employee from the team? </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleDeleteEmployee}>Delete</Button>
                    </DialogActions>
                </Dialog>
        </div>
    );
};

export default EmployeePropsButton;