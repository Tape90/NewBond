import { Box, Button } from "@mui/material";
import Headline from "../Headers/Headline";
import TextfieldLogin from "../Textfields/TextFieldLogin";
import QuoteCard from "../Cards/QuoteCard";
import SubmitButton from "../Buttons/SubmitButton";
import SmallHelperText from "../Texts/SmallHelperText";
import {GoogleButton, AppleButton} from "../Buttons/SsoButtons";
import showNotification from "../notification/showNotification";
import { useRef } from "react";

//Navigator hook
import { useNavigate } from "react-router-dom";
//axios 
import axios from "axios";

export default function Login({handleLogin}) {

    const valueEmail = useRef();
    const valuePassword = useRef();
    const navigator = useNavigate();

    //Login request here
    const handleClick = async(e) => {
        e.preventDefault();
        const data = {
            email: valueEmail.current.value,
            password: valuePassword.current.value
        }
        const config = {
            url: "http://localhost:3001/api/login",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: data
        }
        try {
            const response = await axios(config);
            showNotification(`${response.data.message}`,"normal");
            localStorage.setItem("token", response.data.token);
            handleLogin(true);
            navigator("/feed");

        } catch(error) {
            showNotification(`${error.response.data.message}`,"red");
        }
    }
    // const googleHandleLogin= async() => {
    //     const config = {
    //         url: "http://localhost:3001/api/auth/google",
    //         method: "GET",  
    //     }
    //     const response = await axios(config);
    //     if(response === 200) {
    //         console.log(response);
    //         handleLogin(true);
    //         navigator("/login");
    //     }
    //     else {
    //         console.log(response);
    //         showNotification("Something went wrong","red");
    //     }
    // }

    return(
        <Box sx={{
            width: "100vw",
            height: "100vh",
            display: "grid",
            gridTemplateRows: "15% 65% 20%",
            fontSize: "32px"
        }}>
        <Headline weight={"200%"}/>
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "50% 50%",
            // border: "2px solid red"
        }}>
            <Box sx={{
            width: "100%",
            height: "100%",
            
            // border: "2px solid green"
        }}>
            <TextfieldLogin valueEmail={valueEmail} valuePassword={valuePassword}/>
        </Box>
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // border: "2px solid yellow"
        }}>
        
            <QuoteCard/>
        </Box>
        </Box>
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "10%",
            // border: "2px solid blue"
        }}>
            <SubmitButton
            onHandleClick={handleClick}
            text={"Login"} heightVal={"20%"}/>
            <SmallHelperText text={"or continue with"}/>
            <Box 
            sx={{
                width: "80vw",
                display: "flex",
                gap: "1%",
                justifyContent: "center",
                alignItems: "center"
            }}> 
                <Button><GoogleButton/></Button>
                <Button><AppleButton/></Button>
                
            </Box>
        </Box>
        </Box>
    )
}