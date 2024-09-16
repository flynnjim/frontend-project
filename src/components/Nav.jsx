import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const buttonStyle = {
    width: 100,
    flex: 1,
    backgroundColor: '#E6A4B4',
    minHeight: {xs: 'auto', md: 100},
    minWidth: {xs: 'auto', sm: 100, md: 200},
    minHeight: {xs: 'auto', sm: 50, md: 100},
    fontSize: {xs: '0.75rem', sm: '1rem', md: '2rem'}
}

const boxStyle = { 
    flexGrow: 1,
    width: '100%',
    backgroundColor: "#FFF8E3",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: {xs: 'auto', md: 100},
    minWidth: {xs: 'auto', sm: 500, md: 1000},
    padding: {xs: 1, sm: 2, md:3},
     }

const Nav = () => {
  return (
    <>
      <Box
        sx={boxStyle}
      >
        <Stack direction="row" spacing={2}
        sx={{ width: 'auto', maxWidth: 1000}}
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