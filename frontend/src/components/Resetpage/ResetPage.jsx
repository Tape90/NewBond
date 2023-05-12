import { Box,Button,TextField,Typography   } from "@mui/material";
import { useRef,useState,useEffect } from "react";
import axios from "axios";
import showNotification from "../notification/showNotification";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';

const onFormHandle = async(e,formRef,setResetNumber,navigator) => {
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
        localStorage.setItem("resetEmail",response.data.token);
        showNotification("Email sent with code to reset password","normal");
        navigator("/reset/verify");
        console.log(response)
        
    }  catch (error) {
        showNotification(error.response.data.message,"red");
        console.log(error);
    }
     
}
const onVerifyHandle = async(e,formRef,resetNumber,navigator,setResetAllowed) => {
    e.preventDefault();
    const code = formRef.code.value;
    if(code == resetNumber) {
        showNotification("Code verified","normal");
        setResetAllowed(true);
        navigator("/reset/newPassword");
    } else {
        showNotification("Code not verified","red");
    }
}

const checkPassword = (formRefCurrent,setEqual) => {
    formRefCurrent.password.value === formRefCurrent.passwordVerify.value ? setEqual(true) : setEqual(false);
}

const onNewPasswordHandle = async(e,formRef,navigator,equal,emailToken,setEmailToken) => {
    e.preventDefault();
    if(equal) {
        const newPassword = formRef.password.value;

        const config = {
            url: "http://localhost:3001/api/auth/reset/newPassword",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${emailToken}`,
            },
            data: {
                password: newPassword,
            },
        }
        try {
            const response = await axios(config);
            showNotification(response.data.message,"normal");
            setEmailToken("");
            localStorage.removeItem("resetEmail");
            navigator("/login");
            console.log(response);
        }   catch (error) {
            showNotification(error.response.data.message,"red");
            localStorage.removeItem("resetEmail");
            navigator("/login");
            console.log(error);
        }
    } else {
        showNotification("Passwords are not equal","red");
    }
}




export default function ResetPage({text,resetNumber,setResetNumber,setResetAllowed,resetAllowed}) {
    const [fieldType,setFieldType] = useState(true);
    const [equal,setEqual] = useState(false);
    const [emailToken,setEmailToken] = useState("");
    const formRef = useRef();
    const navigator = useNavigate();
    useEffect(() => {
        setEmailToken(localStorage.getItem("resetEmail"));
    },[])
    {if(text==="Type in your Email to reset passwort") {
        return(
            <Box
            ref={formRef}
            onSubmit={(e) => onFormHandle(e,formRef.current,setResetNumber,navigator)}
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
        } else if(text==="Type in the code you received via Email") {
            return(
            <Box
            ref={formRef}
            onSubmit={(e) => onVerifyHandle(e,formRef.current,resetNumber,navigator,setResetAllowed,resetAllowed)}
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
                    type="number"
                    name="code"
                    id="outlined-required"
                    label="🤫code"
                    defaultValue="code"
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
        } else if(text==="Type in your new Password") {
            return(
                <Box
                ref={formRef}
                onSubmit={(e) => onNewPasswordHandle(e,formRef.current,navigator,equal,emailToken,setEmailToken)}
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
                        InputLabelProps={{
                            style: { color: 'black' },
                        }}   
                        sx={{
                            width: "30%",
                            marginBottom: "10%",
                        }}
                        required
                        type={fieldType ? "password" : "text"}
                        name="password"
                        id="outlined-required"
                        label="🤫new Password"
                        defaultValue="12345"
                        /><VisibilityIcon onClick={(e) => setFieldType(!fieldType)}/>
                    <TextField
                    onChange={() => checkPassword(formRef.current,setEqual)}
                    InputLabelProps={{
                        style: { color: 'black' },
                    }}   
                        sx={{
                            width: "30%",
                            marginBottom: "10%",
                        }}
                        required
                        type={fieldType ? "password" : "text"}
                        name="passwordVerify"
                        id="outlined-required"
                        defaultValue="12345"
                        label={equal ? "💚 Equal" : "❗Password not equal"}
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
    }
}