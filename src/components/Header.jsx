import { Typography } from "@mui/material"
import Box from "@mui/material/Box";

const Header = () => {
    return (
        <>
        <Box
        sx={{ 
            flexGrow: 1,
            width: '100%',
            padding: 1,
            backgroundColor: "#9CA986",
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: {xs: 'auto', sm: 20, md: 40},
            minWidth: {xs: 'auto', sm: 500, md: 1000},
            padding: {xs: 1, sm: 2, md:3},
        }}
        >
        <Typography variant="h1" >NC NEWS</Typography>
    </Box>
          </>
    )
}

export default Header