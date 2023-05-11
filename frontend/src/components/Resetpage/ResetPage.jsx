import { Box,Button,TextField,Typography   } from "@mui/material";
import { useRef } from "react";
import axios from "axios";
import showNotification from "../notification/showNotification";

const onFormHandle = async(e,formRef,setResetNumber) => {
    e.preventDefault();
    const email = formRef.email.value;
    const config = {
        url: "http://localhost:3001/api/auth/reset",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            email: email,
        },
    }
    try {
        const response = await axios(config);
        setResetNumber(response.data.code);
        showNotification("Email sent with code to reset password","normal");
        console.log(response)
    }  catch (error) {
        showNotification(error.response.data.message,"red");
        console.log(error);
    }
    
    
}

export default function ResetPage({text,resetNumber,setResetNumber}) {
    const formRef = useRef();
    return(
        <Box
        ref={formRef}
        onSubmit={(e) => onFormHandle(e,formRef.current,setResetNumber)}
        component="form"
        autoComplete="off"
        sx={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            flexDirection: "column",
            width: "100%",
            height: "100%",
        }}
        >
            <Typography variant="h4" sx={{marginBottom: "10%"}}>{text}</Typography> 
            <TextField
    
                sx={{
                    width: "30%",
                    marginBottom: "10%",
                }}
                required
                type="email"
                name="email"
                id="outlined-required"
                label="💌Email"
                defaultValue="email"
                />
            <Button
                sx={{
                    width: "30%",
                    height: "40%",
                    marginBottom: "10%",
                }}
                variant="contained"
                type="submit"
            >Submit</Button>

        </Box>
    );
}