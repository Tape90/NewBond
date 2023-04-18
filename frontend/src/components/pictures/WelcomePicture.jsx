import { Box } from "@mui/material";

export default function WelcomePicture() {
    return(
        <Box
        component="img"
        sx={{
            height: "20vh",
            width: "20vw",
            alignSelf: "center"
        }}
        alt="love loop logo"
        src="/love.png">
        </Box>
    )
}