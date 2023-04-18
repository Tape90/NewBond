import { Box } from "@mui/material";
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";


export default function TextfieldLogin() {
    return(
        <Box
        component="form"
        autoComplete="off"
        sx={{
            display: "flex",
            flexDirection:"column",
            width: "80%",
            height: "100%",
            alignItems:"flex-end",
            justifyContent:"center"
        }}
        >

            <TextField
            
            sx={{
                width: "30%",
                marginBottom: "10%",
      
            }}
                required
                id="outlined-required"
                label="💌Email"
                defaultValue="email"
                name = "email"
                    // inputRef={valueEmail}
                />
            
            <TextField
                sx={{
                    width: "30%",
                  
                    
                }}
                required
                id="outlined-required"
                label="🔑password"
                defaultValue="******"
                hidden
                name = "password"
                    // inputRef={valueEmail}
            />
            <Box sx={{
                width: "30%",
                display: "flex",
                gap: "30%",
                justifyContent: "start"
            }}>
                <Button sx={{
                    width: "30%",
                    color:  "text.primary"
     
                }}>Register</Button>
                <Button sx={{
                    width: "30%",
                    color:  "text.primary"
                }}>Forgot Password?</Button>
            </Box>
        </Box>
    )
}