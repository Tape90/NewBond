import { Button } from "@mui/material";
import { Box } from "@mui/system";
import NavigateBar from "../Bars/NavigateBar.jsx";


export default function ClickableExtendButtons({element,text,handleClick,handleParam,id,posts,setPosts,handleLogout}) {
  return (
    <>
      <Box sx={{
        display: "flex"
      }}>
        <Button onClick={(e) => handleParam? handleClick(handleParam) :handleClick(id,posts,setPosts)}>
          {element}
        </Button>
          {text && <p style={{
            fontSize: "50%",
            color: "text.primary",
            textAlign: "center"
          }}>{text}</p>}
      </Box>
        {handleParam && <NavigateBar handleLogout={handleLogout}/>}
    </>
  );
}