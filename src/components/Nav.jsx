import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const buttonStyle = { width: 100, flex: 1, backgroundColor: '#E6A4B4'}

const Nav = () => {
  return (
    <>
      <Box
        sx={{ 
          flexGrow: 1,
          minWidth: 500,
          padding: 1,
          backgroundColor: "#FFF8E3",
          display: "flex",
          justifyContent: 'center',
          alignItems: 'center'
           }}
      >
        <Stack direction="row" spacing={2}
        sx={{ width: 'auto', maxWidth: 600}}
        >

            <Button sx={buttonStyle} variant="contained">
              <a href="/homepage">Home</a>
            </Button>

            <Button sx={buttonStyle} variant="contained">
              <a href="/articles">Articles</a>
            </Button>

            <Button sx={buttonStyle} variant="contained">
              <a href="/users">Users</a>
            </Button>

        </Stack>


      </Box>
    </>
  );
};

export default Nav;