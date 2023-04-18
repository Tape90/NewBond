import { Box } from "@mui/material";
import Headline from "../Headers/Headline";
import TextfieldLogin from "../textfields/TextFieldLogin";

export default function Login() {
    return(
        <Box sx={{
            width: "100vw",
            height: "100vh",
            display: "grid",
            gridTemplateRows: "15% 70% 15%",
            fontSize: "32px"
        }}>
        <Headline weight={"200%"}/>
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "50% 50%",
            border: "2px solid red"
        }}>
            <Box sx={{
            width: "100%",
            height: "100%",
            
            border: "2px solid green"
        }}>
            <TextfieldLogin/>
        </Box>
        <Box sx={{
            width: "100%",
            height: "100%",

            border: "2px solid yellow"
        }}></Box>
        </Box>
        <Box sx={{
            width: "100%",
            height: "100%",
                

            border: "2px solid blue"
        }}></Box>
        </Box>
    )
}