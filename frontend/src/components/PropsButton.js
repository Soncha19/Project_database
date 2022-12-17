import React, {useEffect, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {getToken} from "./UserLog";


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
                    Authorization: `Bearer ${getToken()}`
                },
            })
                .then((response) => response.json())
                .then((post) => {

                })
                .catch((err) => {
                    console.log(err.message);
                });

             window.location.reload(false);
        };
        const handleDeleteTeam = () => {

                // DELETE request using fetch with set headers
                const requestOptions = {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${getToken()}`

                    }
                };
                fetch('http://localhost:8080/team/?team_id=' + props.props.id.id.toString(), requestOptions)
                    .then();
                setDialogDel(null);
                window.location.reload(false);

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

                <Dialog PaperProps={{
                    style: {
                        backgroundColor:  '#E2CEB5',
                    },
                }} open={open} onClose={handleClose}>
                    <DialogTitle  sx={{bgcolor:"#093CA9", color:"white", borderRadius:'9px', m:2}}>Update team name </DialogTitle>
                    <DialogContent>
                        <TextField sx={{bgcolor:"white"}}
                            autoFocus
                            onChange={handleChangeTeamName}
                            margin="dense"
                            id="name"
                            label="enter new name"
                            type="text"
                            fullWidth
                            variant="filled"
                        />
                    </DialogContent>
                    <DialogTitle  sx={{bgcolor:"#093CA9", color:"white", borderRadius:'9px', m:2}}>Update Tag</DialogTitle>
                    <DialogContent>
                        <TextField sx={{bgcolor:"white", color:"black"}}
                            autoFocus
                            onChange={handleChangeTeamTag}
                            margin="dense"
                            id="name_2"
                            label="enter new tag"
                            type="text"
                            fullWidth
                            variant="filled"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button size="small" sx={{color:"black", size:"small", bgcolor: "white",}} variant="contained" onClick={handleClose}>Cancel</Button>
                        <Button  sx={{bgcolor: "#093CA9",}} variant="contained" onClick={handleUpdate}>Submit</Button>
                    </DialogActions>
                </Dialog>
                <Dialog PaperProps={{
                    style: {
                        backgroundColor:  '#E2CEB5',
                    },
                }} open={openDialogDel} onClose={handleClose}>
                    <DialogTitle sx={{bgcolor:"#093CA9", color:"white", borderRadius:'9px', m:2}} >Delete this team? </DialogTitle>
                    <DialogActions>
                        <Button size="small" sx={{color:"black", size:"small", bgcolor: "white",}} variant="contained" onClick={handleClose}>Cancel</Button>
                        <Button sx={{bgcolor: "#093CA9",}} variant="contained" onClick={handleDeleteTeam}>Delete</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
;

export default PropsButton;