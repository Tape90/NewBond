import { Modal } from "@mui/material";
import {Box} from "@mui/material";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";
import { useRef,useState } from "react";
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import showNotification from "../notification/showNotification";

//write a function that sends the input values to the backend
//write a function that is able to upload a image to the express server

 // - write a useState that stores the image
 // - write a axios call that sends the image to a route "/upload"
 // - set the posts object with the new image





export default function PostModal({open,setOpen,posts,setPosts}) {
    const formRef = useRef();
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(e)
        const formData = new FormData();
        // Zugriff auf die einzelnen Eingabefeldwerte über das name Attribut
        const form = formRef.current;
        const id =  uuidv4();
        formData.append("id",id);
        formData.append("title", form.title.value);
        formData.append("location", form.location.value);
        formData.append("instagramLink", form.instagramLink.value);
        formData.append("price", form.price.value);
        formData.append("image", form.image.files[0]);
        formData.append("heart", 0);
        

        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
        // Hier kannst du den FormData an das Backend senden
        try {
          const options = {
            url: "http://localhost:3001/api/posts",
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            data: formData
          }
          const response = await axios(options);
          showNotification("Created Post", "normal");
          console.log(response.data); 
          if (!response.ok) {
            throw new Error("Failed to create post");
          }

        } catch (error) {
          console.error(error);

        }
      };

    return(
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                
                position: 'relative',
                margin: '5% auto',
                width: '50%',
                height: '80%',
                background: '#FFF',
                borderRadius: '2px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                    
                }}>
                    <Box
                    component='form'

                    ref={formRef}
                    onSubmit={(e) => {handleFormSubmit(e)}}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        rowGap: '5%'
                    
                    }}>
                        <Button
                            variant="contained"
                            component="label"
                            >
                            Upload File
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                name="image"
                                // onChange={(e) => {setImage(e.target.files[0])}}
                            />
                            </Button>

                        <TextField id="outlined-basic" label="title" name= "title" variant="outlined" />
                        <TextField id="outlined-basic" label="location" name="location" variant="outlined" />
                        <TextField id="outlined-basic" label="InstaLink" 
                        name="instagramLink" variant="outlined" />
                        <TextField id="outlined-basic" label="Cost" 
                        name="price" variant="outlined" />

                        <Button
                        type="submit"
                        variant="contained"
                        // onClick
                        // ={(e) => {logRef(formRef)}}
                        sx={{
                            width: "50%",
                            height: "10%",
                            backgroundColor: "success.main",
                            color: "text.primary",
                            borderRadius: "15%",
                            top: "10%",
                            position: "relative"
                        }}>Submit</Button>  
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

