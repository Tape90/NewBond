import { Button } from "@mui/material";

export default function SubmitButton({text}) {
    return(
    <Button
        variant='text'
        sx={{
        width: "20vw",
        height: "auto",
        backgroundColor: "success.main",
        color: "text.primary",
        borderRadius: "15%",
        top: "10%"
    }}
    
    >{text}</Button>
    )
}