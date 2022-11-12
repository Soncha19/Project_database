import React, {useEffect, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import Button from "@mui/material/Button";


const PropsButton = (props) => {
        const [anchorEl, setAnchorEl] = useState(null);
        const [dialogDel, setDialogDel] = useState(null);
        const [newTeamName, setNewTeamName] = useState();
        const [newTeamTag, setNewTeamTag] = useState();
        const open = Boolean(anchorEl);
        const openDialogDel = Boolean(dialogDel);


        const handleChangeTeamName = (event) => {
            setNewTeamName(event.target.value)
        };
        const handleChangeTeamTag = (event) => {
            setNewTeamTag(event.target.value)
        };

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
        const handleUpdate = () => {
            setAnchorEl(null);
            fetch('http://localhost:8080/team', {
                method: 'POST',
                body: JSON.stringify({
                    id: props.props.id.id,
                    name: newTeamName,
                    tag: newTeamTag,
                    company_id: props.props.companyId.companyId,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((post) => {

                })
                .catch((err) => {
                    console.log(err.message);
                });


        };
        const handleDeleteTeam = () => {
            setDialogDel(null);

            useEffect(() => {
                // DELETE request using fetch with set headers
                const requestOptions = {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer my-token',
                    }
                };
                fetch('http://localhost:8080/team' + props.props.id.id.toString(), requestOptions)
                    .then();
            }, [])
        };

        return (
            <div>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <ModeEditOutlineTwoToneIcon/>
                </IconButton>
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

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Update team name </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            onChange={handleChangeTeamName}
                            margin="dense"
                            id="name"
                            label="enter new name"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogTitle>Update Tag</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            onChange={handleChangeTeamTag}
                            margin="dense"
                            id="name_2"
                            label="enter new tag"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleUpdate}>Submit</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openDialogDel} onClose={handleClose}>
                    <DialogTitle>Delete this team? </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleDeleteTeam}>Delete</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
;

export default PropsButton;