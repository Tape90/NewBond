import {Box,InputLabel,MenuItem,FormControl,Select} from "@mui/material"



export default function FilterSelect({setFilterOption,filterOption}) {
    const handleChange = (event) => {
        setFilterOption(event.target.value);
    };
    return(
        <Box sx={{ minWidth: "5vw", position: "fixed",bottom:"30%"}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterOption}
                        label="Filter"
                        sx={{backgroundColor: "success.main", borderRadius: "10px", fontWeight: "bold"}}
                        onChange={handleChange}
                    >
                        <MenuItem value={"default"}>Default</MenuItem>
                        <MenuItem value={"heart"}>Hearts</MenuItem>
                        <MenuItem value={"alphabetical"}>A-Z</MenuItem>
                    </Select>
            </FormControl>
        </Box>
    )
}