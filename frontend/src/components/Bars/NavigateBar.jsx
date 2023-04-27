import LoginIcon from '@mui/icons-material/Login';
import ClickableExtendButtons from '../buttons/ClickableExtendButtons';
import { Box } from '@mui/system';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function NavigateBar() {
    return(
        <>
         <Box sx={{
             height: "30%",
             width: "100%",
             display: "flex",
             flexDirection: "column",
             justifyContent: "flex-start",
             backGroundColor: "success.main"
         }}>
            <ClickableExtendButtons element={<LoginIcon sx={{
                display: "block",
                width: "32px",
                height: "32px",
                color: "text.primary",
                borderRadius: "15%"
            }}
            />} text={"Login"}/>
            <ClickableExtendButtons element={<ChatOutlinedIcon sx={{
                width: "32px",
                height: "32px",
                color: "text.primary",
                borderRadius: "15%"
            }}
            />} text={"Feed"}/>
            <ClickableExtendButtons element={<AccountCircleOutlinedIcon sx={{
                width: "32px",
                height: "32px",
                color: "text.primary",
                borderRadius: "15%"
            }}
            />} text={"Profil"}/>
  
         </Box>
        </>
    );
}