import LogoutIcon from '@mui/icons-material/Logout';
import ClickableExtendButtons from '../buttons/ClickableExtendButtons.jsx';
import { Box } from '@mui/system';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


export default function NavigateBar({handleLogout}) {
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
            <ClickableExtendButtons element={<LogoutIcon sx={{
                display: "block",
                width: "32px",
                height: "32px",
                color: "text.primary",
                borderRadius: "15%"
            }}
        
            />} handleClick={handleLogout} text={"Log Out"}/>
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