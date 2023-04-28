import { Box } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import ClickableExtendButtons from "../buttons/ClickableExtendButtons";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState,useEffect } from "react";
import PostCard from "../Cards/PostCard";
import { v4 as uuidv4 } from 'uuid';
import SubmitButton from "../Buttons/SubmitButton";
import PostModal from "../Modals/PostModal";
import axios from "axios";

export default function Feed() {
    const [open,setOpen] = useState(false);
    const onModal = () => {
        setOpen(!open)
    }
    const [expand,setExpand] = useState(true);
    const [posts,setPosts] = useState([]);
    const getPostFromBackend = async () => {
        try {
          const response = await axios("http://localhost:3001/api/posts");
          console.log(response.data)
          const newPosts = response.data.map((post) => {
            return {
              id: post.id,
              title: post.title,
              pictureUrl: post.imageUrl,
              place: post.location,
              instaLink: post.instagramLink,
              cost: post.price,
              heart: post.heart,
            };
          });
          console.log(newPosts);
          setPosts(newPosts);
        } catch (error) {
          console.log(error);
        }
      };
      
      useEffect(() => {
        getPostFromBackend();
      }, []);

    return(
        <>
            <Box 
            sx={{
                height: "100vh",
                width: "100vw",
                overflowY: "scroll",
                display: "grid",
                gridTemplateColumns: "10% 65% 25%",
                fontSize: "32px"

            }}> 
                <Box sx={{
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    height: "100%",
                    width: "100%"
                }}>
                    <ClickableExtendButtons element={<HomeIcon sx={{
                        display: "block",
                        width: "32px",
                        height: "32px",
                        color: "text.primary",
                        borderRadius: "15%"
                    }}
                    />}/>
                    <ClickableExtendButtons element= {expand ? <ExpandMoreIcon sx={{
                        display: "block",
                        width: "32px",
                        height: "32px",
                        color: "text.primary",
                        borderRadius: "15%"
                    }}
                    /> : <KeyboardArrowUpIcon sx={{
                        display: "block",
                        width: "32px",
                        height: "32px",
                        color: "text.primary",
                        borderRadius: "15%"
                    }}/>
                    } handleParam={!expand} handleClick={setExpand}/>
                </Box>
                <Box sx={{
                    height: "100%",
                    width: "100%",
                    rowGap: "10vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start"
                }}>
                    {
                
             
                    posts.map((post) => {
                        return(
                            <>
                                <PostCard key={post.id} id={post.id} pictureUrl={post.pictureUrl} 
                                title={post.title} place={post.place} instaLink={post.instaLink} cost={post.cost} heart={post.heart} posts={posts} setPosts={setPosts}/>             
                            </>
                        )})
                    }


                </Box>
                
                <Box sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    rowGap: "20%"
                }}>
                    <SubmitButton text={"Make new Bond ➕"} postionVal={"sticky"} onHandleClick={onModal}/>
                    {/* add the modal when the button is clicked else nothing*/}


                </Box>
                    {open ? <PostModal open={open} setOpen={setOpen} posts={posts} setPosts={setPosts}/> : null}
 

            </Box>
        </>
    );
}