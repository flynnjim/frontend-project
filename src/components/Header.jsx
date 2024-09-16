import { Typography } from "@mui/material"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Header = () => {
    return (
        <>
        <Box
        sx={{ 
            flexGrow: 1,
            minWidth: 500,
            padding: 1,
            backgroundColor: "#9CA986",
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center'
        }}
        >
        <Typography variant="h1" >NC NEWS</Typography>
    </Box>
          </>
    )
}

export default Header