import { Box } from "@mui/material";
import Headline from "../Headers/Headline";
import ClickableExtendButtons from "../buttons/ClickableExtendButtons";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import SubmitButton from "../Buttons/SubmitButton";
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';


export default function PostCard({id,pictureUrl,title,place,instaLink,cost,heart,posts,setPosts}) {
    const addLike = (id,posts,setPosts) => {
        //add like to clicked post if 0 else remove like
        const newPosts = posts.map((post) => {
            if(post.id === id) {
                if(post.heart === 0) {
                    return {...post, heart: heart + 1}
                } else {
                    return {...post, heart: heart - 1}
                }
            } else {
                return post
            }
        })
        setPosts(newPosts)
    }
    return(
        <>
            <Box sx={{
                height: "45vh",
                width: "80%",
                backgroundColor: "primary.main",
                display: "grid",
                gridTemplateRows: "30% 70%"

            }}>
                <img style={{
                    width: "auto",
                    height: "100%", 
                    justifySelf: "center"
                }}
                alt="Hebammenverband Logo"
                src={pictureUrl}/>
                <Box sx={{
                    display: "grid",
                    gridTemplateRows: "25% 75%",
                }}>
                    <Headline  weight={"28px"} text={title}/>
                    <Box sx={{
                        height: "100%",
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: "60% 40%"
                    }}>
                        <Box sx={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            flexDirection:"column",
                            alignItems: "flex-start",
                            justifyContent: "center"
                        }}>
                                <ClickableExtendButtons element={<LocationOnOutlinedIcon sx={{                        
                                    display: "block",
                                    width: "32px",
                                    height: "32px",
                                    color: "text.primary",
                                    borderRadius: "15%"}}/>} text={place}/>
                                <ClickableExtendButtons element={<LinkOutlinedIcon sx={{                        
                                    display: "block",
                                    width: "32px",
                                    height: "32px",
                                    color: "text.primary",
                                    borderRadius: "15%"}}/>} text={instaLink}/>
                                <ClickableExtendButtons element={<SavingsOutlinedIcon sx={{                        
                                    display: "block",
                                    width: "32px",
                                    height: "32px",
                                    color: "text.primary",
                                    borderRadius: "15%"}}/>} text={cost}/>
                            
                        </Box>
                        <Box sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            rowGap: "30%",
                            alignItems: "center"
                        }}>
                            <SubmitButton text={"Info 💡"} heightVal={"30%"} widthVal={"50%"}/>
                            <ClickableExtendButtons handleClick={addLike} id={id} posts={posts} setPosts={setPosts} element={
                                <Diversity2OutlinedIcon sx={{                        
                                    display: "block",
                                    width: "32px",
                                    height: "32px",
                                    color: "text.primary",
                                    borderRadius: "15%"}}/>} text={`${heart} Bonds`}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}