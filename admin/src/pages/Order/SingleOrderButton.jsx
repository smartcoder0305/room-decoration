import { IconButton } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { UilEdit } from '@iconscout/react-unicons'

function SingleOrderButton({ uid,url,sent }) {
    const navigate = useNavigate();
    const pushToSingleOrderPage = (uid) => {
        console.log(sent)
        if(sent){
            return navigate(`${url}${uid}`);
        }
        
    }
    return (
        <IconButton color="primary" aria-label="upload picture" onClick={() => { pushToSingleOrderPage(uid) }} component="span"><UilEdit /></IconButton>
    )
}

export default SingleOrderButton