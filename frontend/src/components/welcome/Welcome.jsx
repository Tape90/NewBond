import customTheme from "../../customTheme/customTheme";
import Headline from "../Headers/Headline";
import { Box, ThemeProvider } from "@mui/material";
import WelcomePicture from "../pictures/WelcomePicture";
import SubmitButton from "../buttons/SubmitButton";

export default function Welcome(){
    return(

        <Box sx={{
            height: "100vh",
            fontSize: "32px",
            width: "100vw",
            display: "flex",
            rowGap: "5%",
            flexDirection: "column",
            alignItems:"center",
        }}>
          <Headline weight={"200%"}/>
          <WelcomePicture/>     
          <SubmitButton text="Continue"/>
        </Box>   

    )
}