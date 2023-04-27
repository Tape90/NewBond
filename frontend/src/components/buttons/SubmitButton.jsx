import { Button } from "@mui/material";

export default function SubmitButton({text,heightVal,widthVal,postionVal,onHandleClick}) {
    return(
    <Button
        onClick={onHandleClick}
        variant='text'
        sx={{
        width: widthVal ? widthVal : "20vw",
        height: heightVal ? heightVal : "20vh",
        backgroundColor: "success.main",
        color: "text.primary",
        borderRadius: "15%",
        top: "10%",
        position: postionVal ? postionVal : "relative",
    }}
    
    >{text}</Button>
    )
}