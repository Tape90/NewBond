//write a Button component that looks like a google SSO button
//use the SubmitButton component as a template


import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { Button } from '@mui/material';

function GoogleButton() {
    return(
        <>
        {/* Use mui icon to make a button with google symbol */}
            <Button>
                <GoogleIcon
                //Make the css of the button look the color gradient of google's SSO Button
                sx={{
                    width: "32px",
                    height: "32px",
                    color: "text.primary",
                    borderRadius: "15%"
                    
                }}
                />
            </Button>
        </>
    )
}

function AppleButton() {
    return(
        <>
        {/* Use mui icon to make a button with apple symbol */}
            <Button>
                <AppleIcon 
                //Make the css of the button look the color gradient of apple's SSO Button
                sx={{
                    width: "36px",
                    height: "36px",
                    color: "#FFFF",
                    borderRadius: "15%"
                }}
                />
            </Button>
        </>
    )
}
export {GoogleButton, AppleButton};